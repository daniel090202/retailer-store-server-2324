import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { ProductsModule } from './products/products.module';
import { CountersModule } from './counters/counters.module';
import { CustomersModule } from './customers/customers.module';

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
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
