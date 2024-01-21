import { AuthGuard } from '@nestjs/passport';
import {
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { UserDTO } from '@/models';
import { User } from '@prisma/client';
import { GetUser } from '@/decorators';

import { UsersService } from './users.service';

@Controller('api/v1/users')
class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @HttpCode(200)
  getUsersWithQuery(@Query() query: { userName: string; filter: string }) {
    const { userName, filter } = query;

    return this.usersService.getUsers(userName, filter);
  }

  @UseGuards(AuthGuard('users'))
  @Get('me')
  @HttpCode(200)
  showMe(@GetUser() user: User) {
    return this.usersService.showMe(user);
  }

  @Get('get-all-users')
  @HttpCode(200)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('get-all-archived-users')
  @HttpCode(200)
  getAllArchivedUsers() {
    return this.usersService.getAllArchivedUsers();
  }

  @Post('create-user')
  @HttpCode(200)
  createUser(@Body() body: UserDTO) {
    return this.usersService.createUser(body);
  }
}

export { UsersController };
