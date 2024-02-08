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

  @Get('/get-customer-with-phone-number')
  @HttpCode(200)
  getCustomerWithPhoneNumber(
    @Query()
    query: {
      phone: string;
    },
  ) {
    const { phone } = query;

    return this.customersService.getCustomerWithPhoneNumber(phone);
  }

  @Get('/get-customers-with-phone-number')
  @HttpCode(200)
  getCustomersWithPhoneNumber(
    @Query()
    query: {
      page: number;
      phone: string;
      filter: string;
      archivedCustomerStatus: string;
    },
  ) {
    const { page, phone, filter, archivedCustomerStatus } = query;

    return this.customersService.getCustomersWithPhoneNumber(
      page,
      phone,
      filter,
      archivedCustomerStatus,
    );
  }

  @Get('/get-all-customers-with-phone-number')
  @HttpCode(200)
  getAllCustomersWithPhoneNumber(
    @Query()
    query: {
      phone: string;
    },
  ) {
    const { phone } = query;

    return this.customersService.getAllCustomersWithPhoneNumber(phone);
  }

  @Get('get-all-archived-customers')
  @HttpCode(200)
  getAllArchivedCustomers(@Query() query: { page: number }) {
    const { page } = query;

    return this.customersService.getAllArchivedCustomers(page);
  }

  @Post('create-customer')
  @HttpCode(200)
  createCustomer(@Body() body: CustomerDTO) {
    return this.customersService.createCustomer(body);
  }
}
export { CustomersController };
