import { HttpStatus, Injectable } from '@nestjs/common';

import { Coupon } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { CouponDTO } from '@/models';

@Injectable()
class CouponsService {
  constructor(private prismaService: PrismaService) {}

  async getCouponsWithQuery(barcode: string): Promise<{
    statusCode: number;
    message: string;
    data?: Array<Coupon>;
  }> {
    if (barcode.length < 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'None of the orders were found',
      };
    }
    try {
      const coupons: Array<Coupon> | null =
        await this.prismaService.coupon.findMany({
          where: {
            barcode: { startsWith: barcode },
          },
        });

      if (coupons === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the coupons were found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'All of coupons satisfied.',
          data: coupons,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async createCoupon(couponDTO: CouponDTO): Promise<{
    statusCode: number;
    message: string;
    data?: Coupon;
  }> {
    try {
      const coupon: Coupon | undefined = await this.prismaService.coupon.create(
        {
          data: {
            barcode: couponDTO.barcode,
            discountPercentage: couponDTO.discountPercentage,
            usageStatus: couponDTO.usageStatus,
            createdBy: couponDTO.createdBy,
            expiredIn: couponDTO.expiredIn,
          },
        },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully created.',
        data: coupon,
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

export { CouponsService };
