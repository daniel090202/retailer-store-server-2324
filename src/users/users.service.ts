import { User } from '@prisma/client';
import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import { UserDTO } from '@/models';
@Injectable({})
class UsersService {
  constructor(private prismaService: PrismaService) {}

  exclude(user: User): UserDTO {
    const userDTO: UserDTO = new UserDTO(
      user.email,
      user.gender,
      user.age,
      user.phone,
      user.address,
      user.position,
      user.userName,
      user.firstName,
      user.lastName,
      user.middleName as string,
      user.admin,
      user.active,
    );

    return userDTO;
  }

  async showMe(user: User) {
    const { hashedPassword, ...props } = user;

    return {
      statusCode: HttpStatus.OK,
      message: 'User profile.',
      data: props,
    };
  }

  async getAllUsers() {
    try {
      const users: Array<User> = await this.prismaService.user.findMany();
      const usersWithoutPassword: Array<UserDTO> = users.map((user) =>
        this.exclude(user),
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'All available users.',
        data: users,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
        error: error,
      };
    }
  }
}

export { UsersService };
