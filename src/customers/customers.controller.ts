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

  @Get('/')
  @HttpCode(200)
  getProduct(@Query() query: any) {
    const { phone } = query;

    return this.customersService.getCustomer(phone);
  }

  @Get('get-all-customers')
  @HttpCode(200)
  getAllProducts() {
    return this.customersService.getAllCustomers();
  }

  @Post('create-customer')
  @HttpCode(200)
  createCustomer(@Body() body: CustomerDTO) {
    return this.customersService.createCustomer(body);
  }
}
export { CustomersController };
