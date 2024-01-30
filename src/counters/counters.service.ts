import { HttpStatus, Injectable } from '@nestjs/common';

import { Counter } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { CounterDTO } from '@/models';

@Injectable()
class CountersService {
  constructor(private prismaService: PrismaService) {}

  async getCountersWithQuery(barcode: string): Promise<{
    statusCode: number;
    message: string;
    data?: Array<Counter>;
  }> {
    if (barcode.length < 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'None of the counters were found',
      };
    }
    try {
      const counters: Array<Counter> | null =
        await this.prismaService.counter.findMany({
          where: {
            barcode: { startsWith: barcode },
          },
        });

      if (counters === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the counters were found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'All of counters satisfied.',
          data: counters,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async createCounter(counterDTO: CounterDTO): Promise<{
    statusCode: number;
    message: string;
    data?: Counter;
  }> {
    try {
      const counter: Counter | undefined =
        await this.prismaService.counter.create({
          data: {
            barcode: counterDTO.barcode,
            location: counterDTO.location,
          },
        });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully created.',
        data: counter,
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

export { CountersService };
