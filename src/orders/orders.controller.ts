import {
  Get,
  Put,
  Post,
  Body,
  Query,
  HttpCode,
  Controller,
} from '@nestjs/common';

import { OrderDTO, CounterDTO, ShipmentDTO } from '@/models';

import { OrdersService } from './orders.service';

@Controller('api/v1/orders')
class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/get-orders-with-ID')
  @HttpCode(200)
  getOrdersWithID(@Query() query: { ID: number }) {
    const { ID } = query;

    return this.ordersService.getOrdersWithID(ID);
  }

  @Get('/get-orders-with-phone')
  @HttpCode(200)
  getOrdersWithPhone(@Query() query: { customerPhone: string }) {
    const { customerPhone } = query;

    return this.ordersService.getOrdersWithPhone(customerPhone);
  }

  @Post('create-order')
  @HttpCode(200)
  createOrder(
    @Body()
    orderDTO: OrderDTO,
  ) {
    return this.ordersService.createOrder(orderDTO);
  }
}

export { OrdersController };
