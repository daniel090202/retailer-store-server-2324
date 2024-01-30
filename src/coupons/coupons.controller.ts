import { Get, Post, Body, Query, HttpCode, Controller } from '@nestjs/common';

import { CouponDTO } from '@/models';

import { CouponsService } from './coupons.service';

@Controller('api/v1/coupons')
class CouponsController {
  constructor(private couponsService: CouponsService) {}

  @Get('/')
  @HttpCode(200)
  getCouponsWithQuery(@Query() query: { barcode: string }) {
    const { barcode } = query;

    return this.couponsService.getCouponsWithQuery(barcode);
  }

  @Post('create-coupon')
  @HttpCode(200)
  createCoupon(@Body() couponDTO: CouponDTO) {
    return this.couponsService.createCoupon(couponDTO);
  }
}

export { CouponsController };
