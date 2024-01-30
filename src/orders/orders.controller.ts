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

  @Get('/')
  @HttpCode(200)
  getOrdersWithQuery(@Body() body: { ID: number }) {
    const { ID } = body;

    return this.ordersService.getOrdersWithQuery(ID);
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
