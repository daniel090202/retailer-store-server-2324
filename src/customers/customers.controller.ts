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
  getProductsWithQuery(@Query() query: { phone: string; filter: string }) {
    const { phone, filter } = query;

    return this.customersService.getCustomers(phone, filter);
  }

  @Get('get-all-customers')
  @HttpCode(200)
  getAllCustomers() {
    return this.customersService.getAllCustomers();
  }

  @Get('get-all-archived-customers')
  @HttpCode(200)
  getAllArchivedCustomers() {
    return this.customersService.getAllArchivedCustomers();
  }

  @Post('create-customer')
  @HttpCode(200)
  createCustomer(@Body() body: CustomerDTO) {
    return this.customersService.createCustomer(body);
  }
}
export { CustomersController };
