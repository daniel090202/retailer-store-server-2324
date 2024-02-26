import { Get, Post, Body, Query, HttpCode, Controller } from '@nestjs/common';

import { CounterDTO } from '../models';

import { CountersService } from './counters.service';

@Controller('api/v1/counters')
class CountersController {
  constructor(private countersService: CountersService) {}

  @Get('/')
  @HttpCode(200)
  getCountersWithQuery(@Query() query: { barcode: string }) {
    const { barcode } = query;

    return this.countersService.getCountersWithQuery(barcode);
  }

  @Post('create-counter')
  @HttpCode(200)
  createCounter(@Body() counterDTO: CounterDTO) {
    return this.countersService.createCounter(counterDTO);
  }
}

export { CountersController };
