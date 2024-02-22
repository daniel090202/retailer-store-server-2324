import { HttpStatus, Injectable } from '@nestjs/common';

import { Order } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
class SalesService {
  constructor(private prismaService: PrismaService) {}

  convertDateToTime(day: Date) {
    return day.getTime();
  }

  normalizeDate(day: Date): {
    date: number;
    month: number;
    year: number;
    day: string;
  } {
    const date = day.getDate();
    const month = day.getMonth() + 1;
    const year = day.getFullYear();

    return {
      date: date,
      month: month,
      year: year,
      day: `${date}/${month}/${year}`,
    };
  }

  groupByTimelineOrTimePeriod = (
    orders: Array<Order>,
    timeline: number,
    endDay?: string,
    startDay?: string,
  ): Array<{
    date: number;
    month: number;
    year: number;
    day: string;
    totalOrders: number;
    totalRevenue: number;
    totalAmount: number;
  }> => {
    const groupedByOrders: Array<{
      date: number;
      month: number;
      year: number;
      day: string;
      totalOrders: number;
      totalRevenue: number;
      totalAmount: number;
    }> = [];

    const today = new Date();

    orders.forEach((order) => {
      const createdDate = new Date(order.createdAt);

      const date = createdDate.getDate();
      const month = createdDate.getMonth() + 1;
      const year = createdDate.getFullYear();

      const day = `${date}/${month}/${year}`;

      switch (timeline) {
        case 0:
          if (
            date === today.getDate() &&
            month === today.getMonth() + 1 &&
            year === today.getFullYear()
          ) {
            const existedDay = groupedByOrders.find((groupedByOrder) => {
              return groupedByOrder.day === day;
            });

            if (existedDay !== undefined) {
              const indexOfExistedDay = groupedByOrders.indexOf(existedDay);

              groupedByOrders[indexOfExistedDay].totalOrders =
                existedDay.totalOrders + 1;

              groupedByOrders[indexOfExistedDay].totalRevenue =
                existedDay.totalRevenue + order.totalExpense;

              groupedByOrders[indexOfExistedDay].totalAmount =
                existedDay.totalAmount + order.totalAmount;
            } else {
              groupedByOrders.push({
                date: date,
                month: month,
                year: year,
                day: `${date}/${month}/${year}`,
                totalOrders: 1,
                totalRevenue: order.totalExpense,
                totalAmount: order.totalAmount,
              });
            }
          }

          break;
        case 1:
          if (
            date === today.getDate() - 1 &&
            month === today.getMonth() + 1 &&
            year === today.getFullYear()
          ) {
            const existedDay = groupedByOrders.find((groupedByOrder) => {
              return groupedByOrder.day === day;
            });

            if (existedDay !== undefined) {
              const indexOfExistedDay = groupedByOrders.indexOf(existedDay);

              groupedByOrders[indexOfExistedDay].totalOrders =
                existedDay.totalOrders + 1;

              groupedByOrders[indexOfExistedDay].totalRevenue =
                existedDay.totalRevenue + order.totalExpense;

              groupedByOrders[indexOfExistedDay].totalAmount =
                existedDay.totalAmount + order.totalAmount;
            } else {
              groupedByOrders.push({
                date: date,
                month: month,
                year: year,
                day: `${date}/${month}/${year}`,
                totalOrders: 1,
                totalRevenue: order.totalExpense,
                totalAmount: order.totalAmount,
              });
            }
          }

          break;
        case 3:
          const firstMonthDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
          );

          const lastMonthDay = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0,
          );

          if (
            this.convertDateToTime(createdDate) >
              this.convertDateToTime(firstMonthDay) &&
            this.convertDateToTime(createdDate) <
              this.convertDateToTime(lastMonthDay)
          ) {
            const existedDay = groupedByOrders.find((groupedByOrder) => {
              return groupedByOrder.day === day;
            });

            if (existedDay !== undefined) {
              const indexOfExistedDay = groupedByOrders.indexOf(existedDay);

              groupedByOrders[indexOfExistedDay].totalOrders =
                existedDay.totalOrders + 1;

              groupedByOrders[indexOfExistedDay].totalRevenue =
                existedDay.totalRevenue + order.totalExpense;

              groupedByOrders[indexOfExistedDay].totalAmount =
                existedDay.totalAmount + order.totalAmount;
            } else {
              groupedByOrders.push({
                date: date,
                month: month,
                year: year,
                day: `${date}/${month}/${year}`,
                totalOrders: 1,
                totalRevenue: order.totalExpense,
                totalAmount: order.totalAmount,
              });
            }
          }

          break;
        case 4:
          if (startDay && endDay) {
            const endTime = new Date(endDay);
            const startTime = new Date(startDay);

            if (
              this.convertDateToTime(createdDate) >
                this.convertDateToTime(startTime) &&
              this.convertDateToTime(createdDate) <
                this.convertDateToTime(endTime)
            ) {
              const existedDay = groupedByOrders.find((groupedByOrder) => {
                return groupedByOrder.day === day;
              });

              if (existedDay !== undefined) {
                const indexOfExistedDay = groupedByOrders.indexOf(existedDay);

                groupedByOrders[indexOfExistedDay].totalOrders =
                  existedDay.totalOrders + 1;

                groupedByOrders[indexOfExistedDay].totalRevenue =
                  existedDay.totalRevenue + order.totalExpense;

                groupedByOrders[indexOfExistedDay].totalAmount =
                  existedDay.totalAmount + order.totalAmount;
              } else {
                groupedByOrders.push({
                  date: date,
                  month: month,
                  year: year,
                  day: `${date}/${month}/${year}`,
                  totalOrders: 1,
                  totalRevenue: order.totalExpense,
                  totalAmount: order.totalAmount,
                });
              }
            }
          }

          break;
        default:
          const firstWeekDay = new Date(
            today.setDate(
              today.getDate() -
                today.getDay() +
                (today.getDay() === 0 ? -6 : 1),
            ),
          );

          const lastWeekDay = new Date(
            today.setDate(today.getDate() - today.getDay() + 7),
          );

          if (
            this.convertDateToTime(createdDate) >
              this.convertDateToTime(firstWeekDay) &&
            this.convertDateToTime(createdDate) <
              this.convertDateToTime(lastWeekDay)
          ) {
            const existedDay = groupedByOrders.find((groupedByOrder) => {
              return groupedByOrder.day === day;
            });

            if (existedDay !== undefined) {
              const indexOfExistedDay = groupedByOrders.indexOf(existedDay);

              groupedByOrders[indexOfExistedDay].totalOrders =
                existedDay.totalOrders + 1;

              groupedByOrders[indexOfExistedDay].totalRevenue =
                existedDay.totalRevenue + order.totalExpense;

              groupedByOrders[indexOfExistedDay].totalAmount =
                existedDay.totalAmount + order.totalAmount;
            } else {
              groupedByOrders.push({
                date: date,
                month: month,
                year: year,
                day: `${date}/${month}/${year}`,
                totalOrders: 1,
                totalRevenue: order.totalExpense,
                totalAmount: order.totalAmount,
              });
            }
          }

          break;
      }
    });

    return groupedByOrders;
  };

  async getSalesByTimelineOrTimePeriod(
    page: number,
    timeline: number,
    endDay?: string,
    startDay?: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: {
      totalPage: number;
      totalOrders: number;
      totalRevenue: number;
      totalAmount: number;
      salesData: Array<{
        date: number;
        month: number;
        year: number;
        day: string;
        totalOrders: number;
        totalRevenue: number;
        totalAmount: number;
      }>;
    };
  }> {
    if (page < 1) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page number must be greater than 1.',
      };
    }

    try {
      const itemsPerPage = 7;
      const actualPage = page - 1;

      const orders = await this.prismaService.order.findMany({
        include: {
          orderDetails: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const salesByTimeline = this.groupByTimelineOrTimePeriod(
        orders,
        timeline,
        endDay,
        startDay,
      ).slice(
        itemsPerPage * actualPage,
        itemsPerPage * actualPage + itemsPerPage,
      );

      const totalSales = salesByTimeline.length;
      const totalPage = Math.ceil(totalSales / itemsPerPage);

      const totalOrders = salesByTimeline.reduce((sumOfOrders, order) => {
        return order.totalOrders + sumOfOrders;
      }, 0);

      const totalAmount = salesByTimeline.reduce((sumOfAmount, order) => {
        return order.totalAmount + sumOfAmount;
      }, 0);

      const totalRevenue = salesByTimeline.reduce((sumOfRevenue, order) => {
        return order.totalRevenue + sumOfRevenue;
      }, 0);

      if (orders === null || orders.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'There is no sales in this timeline',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Sales report in this timeline.',
          data: {
            totalPage: totalPage,
            totalOrders: totalOrders,
            totalRevenue: totalRevenue,
            totalAmount: totalAmount,
            salesData: salesByTimeline,
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
}

export { SalesService };
