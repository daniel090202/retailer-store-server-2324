import * as argon from 'argon2';
import { Injectable, HttpStatus } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';

import { UserDTO, LoginDTO } from '@/dto';

import { GenerateTokens } from '@/utils';

@Injectable({})
class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  generateTokens = new GenerateTokens(this.jwtService, this.configService);

  async login(loginDTO: LoginDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          userName: loginDTO.userName,
        },
      });

      if (!user) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Identification failed.',
        };
      } else {
        const passwordMatched = await argon.verify(
          user.hashedPassword,
          loginDTO.password,
        );

        if (!passwordMatched) {
          return {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'Credentials failed.',
          };
        } else {
          const { accessToken } = await this.generateTokens.signAccessToken(
            user.userName,
          );

          return {
            statusCode: HttpStatus.OK,
            message: 'Successfully logged in.',
            accessToken: accessToken,
          };
        }
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async register(userDTO: UserDTO) {
    const userName = userDTO.email.split('@')[0];
    const hashedPassword = await argon.hash(userName);

    try {
      const user = await this.prismaService.user.create({
        data: {
          gender: userDTO.gender,
          age: userDTO.age,
          phone: userDTO.phone,
          address: userDTO.address,
          position: userDTO.position,
          userName: userName,
          firstName: userDTO.firstName,
          middleName: userDTO.middleName,
          lastName: userDTO.lastName,
          email: userDTO.email,
          hashedPassword: hashedPassword,
        },
        select: {
          gender: true,
          age: true,
          phone: true,
          address: true,
          position: true,
          userName: true,
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully registered.',
        data: user,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          statusCode: error.code,
          message: 'Duplicate registration.',
        };
      }

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }
}

export { AuthService };
