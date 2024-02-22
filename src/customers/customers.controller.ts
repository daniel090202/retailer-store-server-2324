import {
  Get,
  Post,
  Body,
  Patch,
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

  @Patch('block-customer')
  @HttpCode(200)
  blockCustomer(@Body() body: { phone: string }) {
    const { phone } = body;

    return this.customersService.blockCustomer(phone);
  }

  @Patch('unblock-customer')
  @HttpCode(200)
  unblockCustomer(@Body() body: { phone: string }) {
    const { phone } = body;

    return this.customersService.unblockCustomer(phone);
  }

  @Patch('update-customer-email-address')
  @HttpCode(200)
  updateCustomerEmailAddress(@Body() body: { phone: string; email: string }) {
    const { phone, email } = body;

    return this.customersService.updateCustomerEmailAddress(phone, email);
  }

  @Patch('update-customer-residential-address')
  @HttpCode(200)
  updateCustomerResidentialAddress(
    @Body() body: { phone: string; address: string },
  ) {
    const { phone, address } = body;

    return this.customersService.updateCustomerResidentialAddress(
      phone,
      address,
    );
  }

  @Patch('update-customer-phone-number')
  @HttpCode(200)
  updateCustomerPhoneNumber(
    @Body() body: { previousPhone: string; updatedPhone: string },
  ) {
    const { previousPhone, updatedPhone } = body;

    return this.customersService.updateCustomerPhoneNumber(
      previousPhone,
      updatedPhone,
    );
  }

  @Patch('update-customer-age')
  @HttpCode(200)
  updateCustomerAge(@Body() body: { phone: string; age: number }) {
    const { phone, age } = body;

    return this.customersService.updateCustomerAge(
      phone,
      parseInt(age.toString()),
    );
  }

  @Patch('update-customer-gender')
  @HttpCode(200)
  updateCustomerGender(@Body() body: { phone: string; gender: number }) {
    const { phone, gender } = body;

    return this.customersService.updateCustomerGender(
      phone,
      parseInt(gender.toString()),
    );
  }
}
export { CustomersController };
