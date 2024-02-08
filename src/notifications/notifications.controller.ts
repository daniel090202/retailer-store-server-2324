import {
  Get,
  Put,
  Post,
  Body,
  Query,
  HttpCode,
  Controller,
} from '@nestjs/common';

import { NotificationDTO } from '@/models';

import { NotificationsService } from './notifications.service';

@Controller('api/v1/notifications')
class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get('/get-notification-with-ID')
  @HttpCode(200)
  getNotificationWithID(@Query() query: { ID: number }) {
    const { ID } = query;

    return this.notificationsService.getNotificationWithID(Number(ID));
  }

  @Get('/get-notifications-with-filter-and-category')
  @HttpCode(200)
  getNotificationsWithFilterAndCategory(
    @Query()
    query: {
      page: number;
      title: string;
      category: string;
      filter: string;
      hiddenNotificationStatus: string;
    },
  ) {
    const { page, title, category, filter, hiddenNotificationStatus } = query;

    return this.notificationsService.getNotificationsWithFilterAndCategory(
      page,
      title,
      category,
      filter,
      hiddenNotificationStatus,
    );
  }

  @Post('create-notification')
  @HttpCode(200)
  createNotification(@Body() body: NotificationDTO) {
    return this.notificationsService.createNotification(body);
  }
}

export { NotificationsController };
