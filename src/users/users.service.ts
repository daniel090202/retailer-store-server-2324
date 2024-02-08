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

  async getUserWithUserName(userName: string): Promise<{
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
          archived: false,
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the users were found.',
        };
      } else {
        const userWithoutPassword = this.exclude(user);

        return {
          statusCode: HttpStatus.OK,
          message: `The user with user name ${userName}.`,
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

  async getUsersWithUserName(
    page: number,
    userName: string,
    filter: string,
    archivedUserStatus: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: {
      totalUser: number;
      totalPage: number;
      allUsers: Array<{
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
      }>;
    };
  }> {
    if (page < 1) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page number must be greater than 1.',
      };
    }

    try {
      const itemsPerPage = 7;
      const actualPage = page - 1;

      let users: Array<User> | null = await this.prismaService.user.findMany({
        skip: actualPage * itemsPerPage,
        take: itemsPerPage,
        where: {
          archived: archivedUserStatus === 'archived' ? true : false,
          userName: { startsWith: userName },
        },
      });

      let allUsers: Array<User> = await this.prismaService.user.findMany({
        where: {
          archived: archivedUserStatus === 'archived' ? true : false,
          userName: { startsWith: userName },
        },
      });

      switch (filter) {
        case 'alphabetical':
          users = await this.prismaService.user.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              archived: archivedUserStatus === 'archived' ? true : false,
              userName: { startsWith: userName },
            },
            orderBy: [
              {
                userName: 'asc',
              },
            ],
          });

          allUsers = await this.prismaService.user.findMany({
            where: {
              archived: archivedUserStatus === 'archived' ? true : false,
              userName: { startsWith: userName },
            },
            orderBy: [
              {
                userName: 'asc',
              },
            ],
          });

          break;
        case 'male':
          users = await this.prismaService.user.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              archived: archivedUserStatus === 'archived' ? true : false,
              AND: [
                {
                  userName: { startsWith: userName },
                },
                {
                  gender: { equals: 0 },
                },
              ],
            },
          });

          allUsers = await this.prismaService.user.findMany({
            where: {
              archived: archivedUserStatus === 'archived' ? true : false,
              AND: [
                {
                  userName: { startsWith: userName },
                },
                {
                  gender: { equals: 0 },
                },
              ],
            },
          });

          break;
        case 'female':
          users = await this.prismaService.user.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              archived: archivedUserStatus === 'archived' ? true : false,
              AND: [
                {
                  userName: { startsWith: userName },
                },
                {
                  gender: { equals: 1 },
                },
              ],
            },
          });

          allUsers = await this.prismaService.user.findMany({
            where: {
              archived: archivedUserStatus === 'archived' ? true : false,
              AND: [
                {
                  userName: { startsWith: userName },
                },
                {
                  gender: { equals: 1 },
                },
              ],
            },
          });

          break;
        case 'ascending-age':
          users = await this.prismaService.user.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              userName: { startsWith: userName },
              archived: archivedUserStatus === 'archived' ? true : false,
            },
            orderBy: [
              {
                age: 'asc',
              },
            ],
          });

          allUsers = await this.prismaService.user.findMany({
            where: {
              userName: { startsWith: userName },
              archived: archivedUserStatus === 'archived' ? true : false,
            },
            orderBy: [
              {
                age: 'asc',
              },
            ],
          });

          break;
        case 'descending-age':
          users = await this.prismaService.user.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              userName: { startsWith: userName },
              archived: archivedUserStatus === 'archived' ? true : false,
            },
            orderBy: [
              {
                age: 'desc',
              },
            ],
          });

          allUsers = await this.prismaService.user.findMany({
            where: {
              userName: { startsWith: userName },
              archived: archivedUserStatus === 'archived' ? true : false,
            },
            orderBy: [
              {
                age: 'desc',
              },
            ],
          });

          break;
        default:
          break;
      }

      const totalUser = allUsers.length;
      const totalPage = Math.ceil(totalUser / itemsPerPage);

      if (users === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the users were found.',
        };
      } else {
        const usersWithoutPassword = users.map((user) => this.exclude(user));

        return {
          statusCode: HttpStatus.OK,
          message: `All users with user name ${userName} of page ${page} over ${totalPage}.`,
          data: {
            totalUser: totalUser,
            totalPage: totalPage,
            allUsers: usersWithoutPassword,
          },
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

  async getAllArchivedUsers(page: number): Promise<{
    statusCode: number;
    message: string;
    data?: {
      totalPage: number;
      totalArchivedUser: number;
      allArchivedUsers: Array<User>;
    };
  }> {
    if (page < 1) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page number must be greater than 1.',
      };
    }

    try {
      const itemsPerPage = 7;
      const actualPage = page - 1;

      const archivedUsers: Array<User> = await this.prismaService.user.findMany(
        {
          skip: actualPage * itemsPerPage,
          take: itemsPerPage,
          where: {
            archived: true,
          },
        },
      );

      const allArchivedUsers: Array<User> =
        await this.prismaService.user.findMany({
          where: {
            archived: true,
          },
        });

      const totalArchivedUser = allArchivedUsers.length;
      const totalPage = Math.ceil(totalArchivedUser / itemsPerPage);

      return {
        statusCode: HttpStatus.OK,
        message: `All archived users of page ${page} over ${totalPage}.`,
        data: {
          totalPage: totalPage,
          totalArchivedUser: totalArchivedUser,
          allArchivedUsers: archivedUsers,
        },
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
