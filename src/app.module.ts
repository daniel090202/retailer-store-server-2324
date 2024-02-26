import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/auth/auth.module.ts';
import { PrismaModule } from '@/prisma/prisma.module.ts';

import { HttpModule } from '@nestjs/axios';

import { AppService } from './app.service.ts';
import { AppController } from './app.controller.ts';

import { UsersModule } from './users/users.module.ts';
import { UsersService } from './users/users.service.ts';
import { UsersController } from './users/users.controller.ts';

import { OrdersModule } from './orders/orders.module.ts';
import { CouponsModule } from './coupons/coupons.module.ts';
import { ProductsModule } from './products/products.module.ts';
import { CountersModule } from './counters/counters.module.ts';
import { CustomersModule } from './customers/customers.module.ts';
import { NotificationsModule } from './notifications/notifications.module.ts';
import { SalesModule } from './sales/sales.module.ts';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    CountersModule,
    CouponsModule,
    NotificationsModule,
    SalesModule,
    HttpModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
