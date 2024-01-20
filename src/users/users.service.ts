import * as argon from 'argon2';

import { Injectable, HttpStatus } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { UserDTO } from '@/models';

@Injectable({})
class UsersService {
  constructor(private prismaService: PrismaService) {}

  exclude(user: User): {
    id: number;
    email: string;
    gender: number;
    age: number;
    phone: string;
    address: number;
    position: number;
    userName: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    admin: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  } {
    const { hashedPassword, ...props } = user;

    return props;
  }

  async getUser(userName: string): Promise<{
    statusCode: number;
    message: string;
    data?: {
      id: number;
      email: string;
      gender: number;
      age: number;
      phone: string;
      address: number;
      position: number;
      userName: string;
      firstName: string;
      middleName: string | null;
      lastName: string;
      admin: boolean;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  }> {
    try {
      const user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Product is not existed.',
        };
      } else {
        const userWithoutPassword = this.exclude(user);

        return {
          statusCode: HttpStatus.OK,
          message: `${userName}'s details.`,
          data: userWithoutPassword,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async showMe(user: User): Promise<{
    statusCode: number;
    message: string;
    data?: {
      id: number;
      email: string;
      gender: number;
      age: number;
      phone: string;
      address: number;
      position: number;
      userName: string;
      firstName: string;
      middleName: string | null;
      lastName: string;
      admin: boolean;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  }> {
    const { hashedPassword, ...props } = user;

    return {
      statusCode: HttpStatus.OK,
      message: 'User profile.',
      data: props,
    };
  }

  async getAllUsers(): Promise<{
    statusCode: number;
    message: string;
    data?: Array<User>;
  }> {
    try {
      const users: Array<User> = await this.prismaService.user.findMany({});

      return {
        statusCode: HttpStatus.OK,
        message: 'All available users.',
        data: users,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getAllArchivedUsers(): Promise<{
    statusCode: number;
    message: string;
    data?: Array<User>;
  }> {
    try {
      const archivedUsers: Array<User> = await this.prismaService.user.findMany(
        {
          where: {
            archived: true,
          },
        },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'All archived users.',
        data: archivedUsers,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async createUser(userDTO: UserDTO) {
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

export { UsersService };
