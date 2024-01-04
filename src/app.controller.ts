import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api/v1/home/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('')
  get(): string {
    return this.appService.get();
  }
}
