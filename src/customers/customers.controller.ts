import {
  Get,
  Put,
  Post,
  Body,
  Query,
  HttpCode,
  Controller,
} from '@nestjs/common';

import { CustomerDTO } from '@/models';

import { CustomersService } from './customers.service';
@Controller('api/v1/customers')
class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post('create-customer')
  @HttpCode(200)
  createCustomer(@Body() body: CustomerDTO) {
    return this.customersService.createCustomer(body);
  }
}
export { CustomersController };
