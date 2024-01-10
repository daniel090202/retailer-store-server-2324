import { AuthGuard } from '@nestjs/passport';
import { Get, HttpCode, Controller, UseGuards } from '@nestjs/common';

import { User } from '@prisma/client';

import { GetUser } from '@/decorators';

import { UsersService } from './users.service';

@Controller('api/v1/users')
class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('users'))
  @Get('me')
  @HttpCode(200)
  me(@GetUser() user: User) {
    return this.usersService.me(user);
  }
}

export { UsersController };
