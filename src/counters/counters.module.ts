import { Module } from '@nestjs/common';

import { CountersService } from './counters.service';
import { CountersController } from './counters.controller';

@Module({
  controllers: [CountersController],
  providers: [CountersService],
})
class CountersModule {}

export { CountersModule };
