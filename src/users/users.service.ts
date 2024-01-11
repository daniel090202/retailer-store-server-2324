import { User } from '@prisma/client';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable({})
class UsersService {
  async showMe(user: User) {
    const { hashedPassword, ...props } = user;

    return {
      statusCode: HttpStatus.OK,
      message: 'User profile.',
      data: props,
    };
  }
}

export { UsersService };
