import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [PrismaModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
class CustomersModule {}
export { CustomersModule };
