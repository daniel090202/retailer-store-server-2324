import { ConfigService } from '@nestjs/config';
import { Get, Controller } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api/v1/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('/')
  home() {
    return this.appService.home();
  }
}
