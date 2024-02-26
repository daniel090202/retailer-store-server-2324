import {
  Get,
  Post,
  Body,
  Patch,
  Query,
  HttpCode,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

  @Patch('block-user')
  @HttpCode(200)
  blockCustomer(@Body() body: { userName: string }) {
    const { userName } = body;

    return this.usersService.blockUser(userName);
  }

  @Patch('unblock-user')
  @HttpCode(200)
  unblockCustomer(@Body() body: { userName: string }) {
    const { userName } = body;

    return this.usersService.unblockUser(userName);
  }

  @Patch('change-password')
  @HttpCode(200)
  changePassword(
    @Body()
    body: {
      userName: string;
      newPassword: string;
      previousPassword: string;
    },
  ) {
    const { userName, newPassword, previousPassword } = body;

    return this.usersService.changePassword(
      userName,
      newPassword,
      previousPassword,
    );
  }

  @Patch('update-user-first-name')
  @HttpCode(200)
  updateUserFirstName(@Body() body: { userName: string; firstName: string }) {
    const { userName, firstName } = body;

    return this.usersService.updateUserFirstName(userName, firstName);
  }

  @Patch('update-user-middle-name')
  @HttpCode(200)
  updateUserMiddleName(@Body() body: { userName: string; middleName: string }) {
    const { userName, middleName } = body;

    return this.usersService.updateUserMiddleName(userName, middleName);
  }

  @Patch('update-user-last-name')
  @HttpCode(200)
  updateUserLastName(@Body() body: { userName: string; lastName: string }) {
    const { userName, lastName } = body;

    return this.usersService.updateUserLastName(userName, lastName);
  }

  @Patch('update-user-phone-number')
  @HttpCode(200)
  updateUserPhoneNumber(@Body() body: { userName: string; phone: string }) {
    const { userName, phone } = body;

    return this.usersService.updateUserPhoneNumber(userName, phone);
  }

  @Patch('update-user-age')
  @HttpCode(200)
  updateUserAge(@Body() body: { userName: string; age: string }) {
    const { userName, age } = body;

    return this.usersService.updateUserAge(userName, parseInt(age));
  }

  @Patch('update-user-gender')
  @HttpCode(200)
  updateUserGender(@Body() body: { userName: string; gender: string }) {
    const { userName, gender } = body;

    return this.usersService.updateUserGender(userName, parseInt(gender));
  }
}

export { UsersController };
