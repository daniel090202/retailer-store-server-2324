import {
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDTO, LoginDTO } from '@/models';

import { AuthService } from './auth.service';

@Controller('api/v1/user/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('users'))
  @Get('refresh-token')
  @HttpCode(200)
  refreshToken(@Param('userName') userName: string) {
    return this.authService.refreshToken(userName);
  }

  @Post('login')
  @HttpCode(200)
  loginUser(@Body() body: LoginDTO) {
    return this.authService.loginUser(body);
  }

  @Post('register')
  @HttpCode(200)
  registerUser(@Body() body: UserDTO) {
    return this.authService.registerUser(body);
  }
}
