import { Body, Post, HttpCode, Controller } from '@nestjs/common';

import { UserDTO, LoginDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('api/v1/user/')
export class AuthController {
  constructor(private authService: AuthService) {}

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
