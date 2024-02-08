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

  @Get('/get-user-with-username')
  @HttpCode(200)
  getUserWithUserName(@Query() query: { userName: string }) {
    const { userName } = query;

    return this.usersService.getUserWithUserName(userName);
  }

  @Get('/get-users-with-username')
  @HttpCode(200)
  getUsersWithUserName(
    @Query()
    query: {
      page: number;
      userName: string;
      filter: string;
      archivedUserStatus: string;
    },
  ) {
    const { page, userName, filter, archivedUserStatus } = query;

    return this.usersService.getUsersWithUserName(
      page,
      userName,
      filter,
      archivedUserStatus,
    );
  }

  @UseGuards(AuthGuard('users'))
  @Get('me')
  @HttpCode(200)
  showMe(@GetUser() user: User) {
    return this.usersService.showMe(user);
  }

  @Get('get-all-archived-users')
  @HttpCode(200)
  getAllArchivedUsers(@Query() query: { page: number }) {
    const { page } = query;

    return this.usersService.getAllArchivedUsers(page);
  }

  @Post('create-user')
  @HttpCode(200)
  createUser(@Body() body: UserDTO) {
    return this.usersService.createUser(body);
  }
}

export { UsersController };
