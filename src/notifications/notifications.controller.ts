import {
  Get,
  Post,
  Body,
  Patch,
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

  @Get('/get-notifications-for-specific-target')
  @HttpCode(200)
  getNotificationsForSpecificTarget(@Query() query: { userName: string }) {
    const { userName } = query;

    return this.notificationsService.getNotificationsForSpecificTarget(
      userName,
    );
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
    console.log(body);
    return this.notificationsService.createNotification(body);
  }

  @Patch('hidden-notification')
  @HttpCode(200)
  hiddenNotification(@Body() body: { barcode: number }) {
    const { barcode } = body;

    return this.notificationsService.hiddenNotification(
      parseInt(barcode.toString()),
    );
  }

  @Patch('publish-notification')
  @HttpCode(200)
  publishNotification(@Body() body: { barcode: number }) {
    const { barcode } = body;

    return this.notificationsService.publishNotification(
      parseInt(barcode.toString()),
    );
  }

  @Patch('update-notification-title')
  @HttpCode(200)
  updateNotificationTitle(@Body() body: { barcode: number; title: string }) {
    const { barcode, title } = body;

    return this.notificationsService.updateNotificationTitle(
      parseInt(barcode.toString()),
      title,
    );
  }

  @Patch('update-notification-content')
  @HttpCode(200)
  updateNotificationContent(
    @Body() body: { barcode: number; content: string },
  ) {
    const { barcode, content } = body;

    return this.notificationsService.updateNotificationContent(
      parseInt(barcode.toString()),
      content,
    );
  }
}

export { NotificationsController };
