import { Request, Response } from 'express';

import {
  Req,
  Res,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDTO, LoginDTO } from '@/dto';

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
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  @HttpCode(200)
  register(@Body() body: UserDTO) {
    return this.authService.register(body);
  }
}
