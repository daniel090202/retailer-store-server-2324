import { User } from '@prisma/client';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable({})
class UsersService {
  constructor() {}

  me(user: User) {
    const { hashedPassword, ...props } = user;

    return {
      statusCode: HttpStatus.OK,
      message: 'User profile.',
      data: props,
    };
  }
}

export { UsersService };
