import { Req, Res, Post, HttpCode, Controller } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

@Controller('api/v1/user/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Req() request: Request, @Res() response: Response) {
    return this.authService.login();
  }

  @Post('register')
  register() {
    return this.authService.register();
  }
}
