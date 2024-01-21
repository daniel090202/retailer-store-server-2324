import { HttpStatus, Injectable } from '@nestjs/common';

import { Customer } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { CustomerDTO } from '@/models';

@Injectable()
class CustomersService {
  constructor(private prismaService: PrismaService) {}

  async getCustomers(
    phone: string,
    filter: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: Array<Customer>;
  }> {
    if (phone.length < 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'None of the customers were found',
      };
    }

    try {
      let customers: Array<Customer> | null =
        await this.prismaService.customer.findMany({
          where: {
            phone: { startsWith: phone },
          },
        });

      switch (filter) {
        case 'alphabetical':
          customers = await this.prismaService.customer.findMany({
            where: {
              phone: { startsWith: phone },
            },
            orderBy: [
              {
                customerName: 'asc',
              },
            ],
          });
          break;
        case 'male':
          customers = await this.prismaService.customer.findMany({
            where: {
              AND: [
                {
                  phone: { startsWith: phone },
                },
                {
                  gender: { equals: 0 },
                },
              ],
            },
          });

          break;
        case 'female':
          customers = await this.prismaService.customer.findMany({
            where: {
              AND: [
                {
                  phone: { startsWith: phone },
                },
                {
                  gender: { equals: 1 },
                },
              ],
            },
          });

          break;
        default:
          break;
      }

      if (customers === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `None of the customers with phone number as ${phone} were not found.`,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: `The customers with phone number as ${phone}'s details.`,
          data: customers,
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
      const customers: Array<Customer> | null =
        await this.prismaService.customer.findMany({});

      if (customers === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the products were found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'All of customers satisfied.',
          data: customers,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getAllArchivedCustomers(): Promise<{
    statusCode: number;
    message: string;
    data?: Array<Customer>;
  }> {
    try {
      const archivedCustomers: Array<Customer> =
        await this.prismaService.customer.findMany({
          where: {
            block: {
              equals: true,
            },
          },
        });

      return {
        statusCode: HttpStatus.OK,
        message: 'All archived customers.',
        data: archivedCustomers,
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
