import { User } from '@prisma/client';
import { Injectable, HttpStatus } from '@nestjs/common';
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
    address: string;
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
      address: string;
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
      address: string;
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
      const users: Array<User> = await this.prismaService.user.findMany();

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
}

export { UsersService };
