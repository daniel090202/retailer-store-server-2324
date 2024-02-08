import { HttpStatus, Injectable } from '@nestjs/common';

import { Notification } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { NotificationDTO } from '@/models';

@Injectable()
class NotificationsService {
  constructor(private prismaService: PrismaService) {}

  async getNotificationWithID(ID: number): Promise<{
    statusCode: number;
    message: string;
    data?: Notification;
  }> {
    try {
      const notification: Notification | null =
        await this.prismaService.notification.findUnique({
          where: {
            id: ID,
            hiddenStatus: false,
          },
        });

      if (notification === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the notifications were found.',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: `The notification with ID as ${ID}.`,
          data: notification,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getNotificationsWithFilterAndCategory(
    page: number,
    title: string,
    category: string,
    filter: string,
    hiddenNotificationStatus: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: {
      totalPage: number;
      totalNotification: number;
      allNotifications: Array<Notification>;
    };
  }> {
    if (title === undefined) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Notification's title is invalid.`,
      };
    }

    if (page < 1) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page number must be greater than 1.',
      };
    }

    try {
      const itemsPerPage = 7;
      const actualPage = page - 1;

      let notifications: Array<Notification> | null;

      const allNotifications: Array<Notification> | null =
        await this.prismaService.notification.findMany({
          where: {
            hiddenStatus: hiddenNotificationStatus === 'hidden' ? true : false,
          },
        });

      const totalNotification = allNotifications.length;
      const totalPage = Math.ceil(totalNotification / itemsPerPage);

      switch (category) {
        case 'degree':
          switch (filter) {
            case 'important':
              notifications = await this.prismaService.notification.findMany({
                skip: actualPage * itemsPerPage,
                take: itemsPerPage,
                where: {
                  title: {
                    startsWith: title,
                  },
                  degree: 1,
                  hiddenStatus:
                    hiddenNotificationStatus === 'hidden' ? true : false,
                },
              });

              break;
            case 'urgent':
              notifications = await this.prismaService.notification.findMany({
                skip: actualPage * itemsPerPage,
                take: itemsPerPage,
                where: {
                  title: {
                    startsWith: title,
                  },
                  degree: 2,
                  hiddenStatus:
                    hiddenNotificationStatus === 'hidden' ? true : false,
                },
              });

              break;
            default:
              notifications = await this.prismaService.notification.findMany({
                skip: actualPage * itemsPerPage,
                take: itemsPerPage,
                where: {
                  title: {
                    startsWith: title,
                  },
                  degree: 0,
                  hiddenStatus:
                    hiddenNotificationStatus === 'hidden' ? true : false,
                },
              });

              break;
          }
          break;
        case 'type':
          switch (filter) {
            case 'newest':
              notifications = await this.prismaService.notification.findMany({
                skip: actualPage * itemsPerPage,
                take: itemsPerPage,
                where: {
                  title: {
                    startsWith: title,
                  },
                  hiddenStatus:
                    hiddenNotificationStatus === 'hidden' ? true : false,
                },
                orderBy: {
                  createdAt: 'desc',
                },
              });

              break;
            case 'latest':
              notifications = await this.prismaService.notification.findMany({
                skip: actualPage * itemsPerPage,
                take: itemsPerPage,
                where: {
                  title: {
                    startsWith: title,
                  },
                  hiddenStatus:
                    hiddenNotificationStatus === 'hidden' ? true : false,
                },
                orderBy: {
                  createdAt: 'asc',
                },
              });

              break;
            case 'distribution':
              notifications = await this.prismaService.notification.findMany({
                skip: actualPage * itemsPerPage,
                take: itemsPerPage,
                where: {
                  title: {
                    startsWith: title,
                  },
                  type: 1,
                  hiddenStatus:
                    hiddenNotificationStatus === 'hidden' ? true : false,
                },
                orderBy: {
                  createdAt: 'desc',
                },
              });

              break;
            case 'salary':
              notifications = await this.prismaService.notification.findMany({
                skip: actualPage * itemsPerPage,
                take: itemsPerPage,
                where: {
                  title: {
                    startsWith: title,
                  },
                  type: 2,
                  hiddenStatus:
                    hiddenNotificationStatus === 'hidden' ? true : false,
                },
              });

              break;
            default:
              notifications = await this.prismaService.notification.findMany({
                skip: actualPage * itemsPerPage,
                take: itemsPerPage,
                where: {
                  title: {
                    startsWith: title,
                  },
                  type: 0,
                  hiddenStatus:
                    hiddenNotificationStatus === 'hidden' ? true : false,
                },
              });

              break;
          }
          break;
        default:
          notifications = await this.prismaService.notification.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              title: {
                startsWith: title,
              },
              hiddenStatus:
                hiddenNotificationStatus === 'hidden' ? true : false,
            },
          });

          break;
      }

      if (notifications === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `None of the notifications with title as ${title} were not found.`,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: `All of the ${hiddenNotificationStatus} notifications of page ${page} over ${totalPage}.`,
          data: {
            totalPage: totalPage,
            allNotifications: notifications,
            totalNotification: totalNotification,
          },
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async createNotification(notificationDTO: NotificationDTO): Promise<{
    statusCode: number;
    message: string;
    data?: Notification;
  }> {
    try {
      const notification: Notification =
        await this.prismaService.notification.create({
          data: {
            title: notificationDTO.title,
            target: notificationDTO.target,
            hiddenStatus: notificationDTO.hiddenStatus,
            degree: notificationDTO.degree,
            type: notificationDTO.type,
            createdBy: notificationDTO.createdBy,
            content: notificationDTO.content,
          },
        });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully created.',
        data: notification,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          statusCode: error.code,
          message: 'Duplicate registration.',
        };
      }

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }
}

export { NotificationsService };
