import { HttpStatus, Injectable } from '@nestjs/common';

import { Customer } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { CustomerDTO } from '@/models';

@Injectable()
class CustomersService {
  constructor(private prismaService: PrismaService) {}

  async getCustomer(phone: string): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    try {
      const customer: Customer | null =
        await this.prismaService.customer.findUnique({
          where: {
            phone: phone,
          },
        });

      if (customer === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Customer ${phone} is not existed.`,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: `${phone}'s details.`,
          data: customer,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getAllCustomers(): Promise<{
    statusCode: number;
    message: string;
    data?: Array<Customer>;
  }> {
    try {
      const customers: Array<Customer> =
        await this.prismaService.customer.findMany({});

      return {
        statusCode: HttpStatus.OK,
        message: 'All available products.',
        data: customers,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async createCustomer(customerDTO: CustomerDTO): Promise<{
    statusCode: number;
    message: string;
    data?: CustomerDTO;
  }> {
    try {
      const customer: CustomerDTO = await this.prismaService.customer.create({
        data: {
          email: customerDTO.email,
          gender: customerDTO.gender,
          age: customerDTO.age,
          phone: customerDTO.phone,
          address: customerDTO.address,
          customerName: customerDTO.customerName,
          accountLevel: customerDTO.accountLevel,
          active: customerDTO.active,
          block: customerDTO.block,
          verified: customerDTO.verified,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully created.',
        data: customer,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          statusCode: error.code,
          message: 'Duplicate registration.',
        };
      }

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }
}

export { CustomersService };
