import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SMTP } from '../services';
import { PrismaModule } from '../prisma/prisma.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [UsersController],
  providers: [UsersService, SMTP],
})
class UsersModule {}

export { UsersModule };
