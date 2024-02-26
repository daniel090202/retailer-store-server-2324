import { Module } from '@nestjs/common';

import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
})
class SalesModule {}

export { SalesModule };
