import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';

import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
class NotificationsModule {}
export { NotificationsModule };
