import * as argon from 'argon2';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Injectable, HttpStatus } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { UserDTO } from '@/models';
import { SMTP } from '@/services';

@Injectable({})
class UsersService {
  constructor(
    private httpService: HttpService,
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  smtp = new SMTP(this.httpService, this.configService);

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
    return {
      statusCode: HttpStatus.OK,
      message: 'User profile.',
      data: this.exclude(user),
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
    try {
      const userName = userDTO.email.split('@')[0];
      const hashedPassword = await argon.hash(userName);

      await this.smtp.sendMail({
        to: userDTO.email,
        name: 'No Brand Store Department',
        subject: `Account verification`,
      });

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

  async blockUser(userName: string): Promise<{
    statusCode: number;
    message: string;
    data?: User;
  }> {
    try {
      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      if (user.archived === true) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} has already been blocked.`,
        };
      }

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          archived: true,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully blocked the user with user name as ${userName}.`,
          data: user,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to block the user with user name as ${userName}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async unblockUser(userName: string): Promise<{
    statusCode: number;
    message: string;
    data?: User;
  }> {
    try {
      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      if (user.archived === false) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} has not been blocked.`,
        };
      }

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          archived: false,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully activated the user with user name as ${userName}.`,
          data: user,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to activate the user with user name as ${userName}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async changePassword(
    userName: string,
    newPassword: string,
    previousPassword: string,
  ): Promise<{
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
      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      const isPasswordsProvidedMatched: boolean = await argon.verify(
        user.hashedPassword,
        previousPassword,
      );

      if (!isPasswordsProvidedMatched) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: `The provided previous password from client ${userName} does not match.`,
        };
      }

      const isPasswordMatched: boolean = await argon.verify(
        user.hashedPassword,
        newPassword,
      );

      if (isPasswordMatched) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The new password for the user with user name as ${userName} is similar to the previous one.`,
        };
      }

      const hashedNewPassword: string = await argon.hash(newPassword);

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          hashedPassword: hashedNewPassword,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully changed the password of user with user name as ${userName}'s account.`,
          data: this.exclude(user),
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the password of the user with user name as ${userName}'s account`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateUserFirstName(
    userName: string,
    firstName: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: User;
  }> {
    try {
      if (
        firstName === '' ||
        firstName.length === 0 ||
        firstName === undefined
      ) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid first name.',
        };
      }

      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      if (user.firstName === firstName) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The first name of user with user name as ${userName} is similar to the previous one.`,
        };
      }

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          firstName: firstName,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the first name of the user with user name as ${userName}.`,
          data: user,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the first name of the customer with user name as ${userName}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateUserMiddleName(
    userName: string,
    middleName: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: User;
  }> {
    try {
      if (
        middleName === '' ||
        middleName.length === 0 ||
        middleName === undefined
      ) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid middle name.',
        };
      }

      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      if (user.middleName === middleName) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The middle name of user with user name as ${userName} is similar to the previous one.`,
        };
      }

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          middleName: middleName,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the middle name of the user with user name as ${userName}.`,
          data: user,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the middle name of the customer with user name as ${userName}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateUserLastName(
    userName: string,
    lastName: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: User;
  }> {
    try {
      if (lastName === '' || lastName.length === 0 || lastName === undefined) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid last name.',
        };
      }

      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      if (user.lastName === lastName) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The last name of user with user name as ${userName} is similar to the previous one.`,
        };
      }

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          lastName: lastName,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the last name of the user with user name as ${userName}.`,
          data: user,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the last name of the customer with user name as ${userName}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateUserPhoneNumber(
    userName: string,
    phone: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: User;
  }> {
    try {
      if (phone === '' || phone.length === 0 || phone === undefined) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid phone number.',
        };
      }

      if (phone.length < 10 || phone.length > 12) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Invalid length of the user's phone number.`,
        };
      }

      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      if (user.phone === phone) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The phone number of user with user name as ${userName} is similar to the previous one.`,
        };
      }

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          phone: phone,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the phone number of the user with user name as ${userName}.`,
          data: user,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the phone number of the customer with user name as ${userName}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateUserAge(
    userName: string,
    age: number,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: User;
  }> {
    try {
      if (age === 0 || age === undefined) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid age.',
        };
      }

      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      if (user.age === age) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The age of user with user name as ${userName} is similar to the previous one.`,
        };
      }

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          age: age,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the age of the user with user name as ${userName}.`,
          data: user,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the age of the customer with user name as ${userName}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateUserGender(
    userName: string,
    gender: number,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: User;
  }> {
    try {
      if (gender === undefined) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid gender.',
        };
      }

      let user: User | null = await this.prismaService.user.findUnique({
        where: {
          userName: userName,
        },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The user with user name as ${userName} was not found.`,
        };
      }

      if (user.gender === gender) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The gender of user with user name as ${userName} is similar to the previous one.`,
        };
      }

      user = await this.prismaService.user.update({
        where: {
          userName: userName,
        },
        data: {
          gender: gender,
        },
      });

      if (user !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the gender of the user with user name as ${userName}.`,
          data: user,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the gender of the customer with user name as ${userName}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }
}

export { UsersService };
