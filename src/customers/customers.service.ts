import { HttpStatus, Injectable } from '@nestjs/common';

import { Customer } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { CustomerDTO } from '@/models';

@Injectable()
class CustomersService {
  constructor(private prismaService: PrismaService) {}

  async getCustomerWithPhoneNumber(phone: string): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    if (phone === undefined) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Customer's phone number is invalid.`,
      };
    }

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
          message: `None of the customers with phone number as ${phone} were not found.`,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: `The customer with phone number as ${phone}.`,
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

  async getCustomersWithPhoneNumber(
    page: number,
    phone: string,
    filter: string,
    archivedCustomerStatus: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: {
      totalPage: number;
      totalCustomer: number;
      allCustomers: Array<Customer>;
    };
  }> {
    if (phone === undefined) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Customer's phone number is invalid.`,
      };
    }

    if (page < 1) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page number must be greater than 1.',
      };
    }

    try {
      const itemsPerPage = 7;
      const actualPage = page - 1;

      let customers: Array<Customer> | null;

      const allCustomers: Array<Customer> | null =
        await this.prismaService.customer.findMany({
          where: {
            block: false,
          },
        });

      const totalCustomer = allCustomers.length;
      const totalPage = Math.ceil(totalCustomer / itemsPerPage);

      switch (filter) {
        case 'alphabetical':
          customers = await this.prismaService.customer.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              block: archivedCustomerStatus === 'archived' ? true : false,
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
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              block: archivedCustomerStatus === 'archived' ? true : false,
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
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              block: archivedCustomerStatus === 'archived' ? true : false,
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
          customers = await this.prismaService.customer.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              block: archivedCustomerStatus === 'archived' ? true : false,
              phone: { startsWith: phone },
            },
          });
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
          message: `All the ${archivedCustomerStatus} customers with phone number as ${phone} of page ${page} over ${totalPage}.`,
          data: {
            totalPage: totalPage,
            allCustomers: customers,
            totalCustomer: totalCustomer,
          },
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getAllCustomersWithPhoneNumber(phone: string): Promise<{
    statusCode: number;
    message: string;
    data?: Array<Customer>;
  }> {
    if (phone === undefined) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Customer's phone number is invalid.`,
      };
    }

    try {
      const customers: Array<Customer> | null =
        await this.prismaService.customer.findMany({
          where: {
            phone: { startsWith: phone },
          },
        });

      if (customers === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `None of the customers with phone number as ${phone} were not found.`,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: `The customer with phone number as ${phone}.`,
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

  async getAllArchivedCustomers(page: number): Promise<{
    statusCode: number;
    message: string;
    data?: {
      totalPage: number;
      totalArchivedCustomer: number;
      allArchivedCustomers: Array<Customer>;
    };
  }> {
    if (page < 1) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page number must be greater than 1.',
      };
    }

    try {
      const itemsPerPage = 7;
      const actualPage = page - 1;

      const archivedCustomers: Array<Customer> =
        await this.prismaService.customer.findMany({
          skip: actualPage * itemsPerPage,
          take: itemsPerPage,
          where: {
            block: true,
          },
        });

      const allArchivedCustomers: Array<Customer> =
        await this.prismaService.customer.findMany({
          where: {
            block: true,
          },
        });

      const totalArchivedCustomer = allArchivedCustomers.length;
      const totalPage = Math.ceil(totalArchivedCustomer / itemsPerPage);

      return {
        statusCode: HttpStatus.OK,
        message: `All archived products of page ${page} over ${totalPage}.`,
        data: {
          totalPage: totalPage,
          allArchivedCustomers: archivedCustomers,
          totalArchivedCustomer: totalArchivedCustomer,
        },
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
    data?: Customer;
  }> {
    try {
      const customer: Customer = await this.prismaService.customer.create({
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

  async blockCustomer(phone: string): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    try {
      let customer: Customer | null =
        await this.prismaService.customer.findUnique({
          where: {
            phone: phone,
          },
        });

      if (customer === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with phone number as ${phone} was not found.`,
        };
      }

      if (customer.block === true) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with phone number as ${phone} has already been blocked.`,
        };
      }

      customer = await this.prismaService.customer.update({
        where: {
          phone: phone,
        },
        data: {
          block: true,
        },
      });

      if (customer !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully blocked the customer with phone number ${phone}.`,
          data: customer,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to block the customer with phone number as ${phone}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async unblockCustomer(phone: string): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    try {
      let customer: Customer | null =
        await this.prismaService.customer.findUnique({
          where: {
            phone: phone,
          },
        });

      if (customer === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with phone number as ${phone} was not found.`,
        };
      }

      if (customer.block === false) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with phone number as ${phone} has not been blocked.`,
        };
      }

      customer = await this.prismaService.customer.update({
        where: {
          phone: phone,
        },
        data: {
          block: false,
        },
      });

      if (customer !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully activated the customer with phone number ${phone}.`,
          data: customer,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to activate the customer with phone number as ${phone}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateCustomerEmailAddress(
    phone: string,
    email: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    try {
      if (phone === '' || phone.length === 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid phone number.',
        };
      }

      let customer: Customer | null =
        await this.prismaService.customer.findUnique({
          where: {
            phone: phone,
          },
        });

      if (customer === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with the phone number as ${phone} was not found.`,
        };
      }

      if (customer.email === email) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The email address of the customer with the phone number as ${phone} is similar to the previous one.`,
        };
      }

      customer = await this.prismaService.customer.update({
        where: {
          phone: phone,
        },
        data: {
          email: email,
        },
      });

      if (customer !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the email address of the customer with the phone number as ${phone}.`,
          data: customer,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the email address of the customer with the phone number as ${phone}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateCustomerResidentialAddress(
    phone: string,
    address: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    try {
      if (phone === '' || phone.length === 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid phone number.',
        };
      }

      let customer: Customer | null =
        await this.prismaService.customer.findUnique({
          where: {
            phone: phone,
          },
        });

      if (customer === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with the phone number as ${phone} was not found.`,
        };
      }

      if (customer.address === address) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The residential address of the customer with the phone number as ${phone} is similar to the previous one.`,
        };
      }

      customer = await this.prismaService.customer.update({
        where: {
          phone: phone,
        },
        data: {
          address: address,
        },
      });

      if (customer !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the residential address of the customer with the phone number as ${phone}.`,
          data: customer,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the residential address of the customer with the phone number as ${phone}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateCustomerPhoneNumber(
    previousPhone: string,
    updatedPhone: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    try {
      if (previousPhone === '' || updatedPhone === '') {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid phone numbers.',
        };
      }

      let customer: Customer | null =
        await this.prismaService.customer.findUnique({
          where: {
            phone: previousPhone,
          },
        });

      if (customer === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with the phone number as ${previousPhone} was not found.`,
        };
      }

      if (customer.phone === updatedPhone) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The new phone number of the customer with the phone number as ${updatedPhone} is similar to the previous one.`,
        };
      }

      customer = await this.prismaService.customer.update({
        where: {
          phone: previousPhone,
        },
        data: {
          phone: updatedPhone,
        },
      });

      if (customer !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the phone number of the customer with the previous one as ${previousPhone}.`,
          data: customer,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the phone number of the customer with the previous one as ${previousPhone}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateCustomerAge(
    phone: string,
    age: number,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    try {
      if (phone === '' || phone.length === 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid phone number.',
        };
      }

      let customer: Customer | null =
        await this.prismaService.customer.findUnique({
          where: {
            phone: phone,
          },
        });

      if (customer === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with the phone number as ${phone} was not found.`,
        };
      }

      if (customer.age === age) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The age of the customer with the phone number as ${phone} is similar to the previous one.`,
        };
      }

      customer = await this.prismaService.customer.update({
        where: {
          phone: phone,
        },
        data: {
          age: age,
        },
      });

      if (customer !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the age of the customer with the phone number as ${phone}.`,
          data: customer,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the age of the customer with the phone number as ${phone}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async updateCustomerGender(
    phone: string,
    gender: number,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: Customer;
  }> {
    try {
      if (phone === '' || phone.length === 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid phone number.',
        };
      }

      let customer: Customer | null =
        await this.prismaService.customer.findUnique({
          where: {
            phone: phone,
          },
        });

      if (customer === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The customer with the phone number as ${phone} was not found.`,
        };
      }

      if (customer.gender === gender) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The gender of the customer with the phone number as ${phone} is similar to the previous one.`,
        };
      }

      customer = await this.prismaService.customer.update({
        where: {
          phone: phone,
        },
        data: {
          gender: gender,
        },
      });

      if (customer !== null) {
        return {
          statusCode: HttpStatus.OK,
          message: `Successfully change the gender of the customer with the phone number as ${phone}.`,
          data: customer,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to change the gender of the customer with the phone number as ${phone}`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }
}

export { CustomersService };
