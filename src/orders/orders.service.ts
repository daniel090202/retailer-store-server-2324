import { HttpStatus, Injectable } from '@nestjs/common';

import { Order } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { OrderDTO } from '@/models';

@Injectable()
class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async getOrdersWithQuery(ID: number): Promise<{
    statusCode: number;
    message: string;
    data?: Array<Order>;
  }> {
    if (ID < 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'None of the orders were found',
      };
    }
    try {
      const orders: Array<Order> | null =
        await this.prismaService.order.findMany({
          where: {
            id: { equals: ID },
          },
          include: {
            orderDetails: true,
          },
        });

      if (orders === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the products were found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'All of orders satisfied.',
          data: orders,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async createOrder(orderDTO: OrderDTO): Promise<{
    statusCode: number;
    message: string;
    data?: Order;
  }> {
    try {
      const shipmentBarcode = orderDTO.shipmentBarcode;

      let order: Order | undefined;

      switch (shipmentBarcode) {
        case '0000000000':
          order = await this.prismaService.order.create({
            data: {
              customerPhone: orderDTO.customerPhone,
              customerPayment: orderDTO.customerPayment,
              customerPaymentMethod: orderDTO.customerPaymentMethod,
              counterID: orderDTO.counterID,
              cashierUserName: orderDTO.cashierUserName,
              couponsAmount: orderDTO.couponsAmount,
              totalExpense: orderDTO.totalExpense,
              totalAmount: orderDTO.totalAmount,
              totalDiscount: orderDTO.totalDiscount,
              exchange: orderDTO.exchange,
              notes: orderDTO.notes,
              paymentStatus: orderDTO.paymentStatus,
              addedCoupons: orderDTO.coupons,

              orderDetails: {
                createMany: {
                  data: orderDTO.orderDetails,
                },
              },
            },
            include: {
              orderDetails: true,
            },
          });

          break;
        default:
          order = await this.prismaService.order.create({
            data: {
              customerPhone: orderDTO.customerPhone,
              customerPayment: orderDTO.customerPayment,
              customerPaymentMethod: orderDTO.customerPaymentMethod,
              counterID: orderDTO.counterID,
              cashierUserName: orderDTO.cashierUserName,
              couponsAmount: orderDTO.couponsAmount,
              totalExpense: orderDTO.totalExpense,
              totalAmount: orderDTO.totalAmount,
              totalDiscount: orderDTO.totalDiscount,
              exchange: orderDTO.exchange,
              notes: orderDTO.notes,
              paymentStatus: orderDTO.paymentStatus,
              shipmentBarcode: orderDTO.shipmentBarcode,
              addedCoupons: orderDTO.coupons,

              orderDetails: {
                createMany: {
                  data: orderDTO.orderDetails,
                },
              },
            },
            include: {
              orderDetails: true,
            },
          });

          break;
      }

      if (order !== undefined) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Successfully created.',
          data: order,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Order could not be fulfilled. Please try again.',
          data: order,
        };
      }
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

export { OrdersService };
