import {
  Min,
  Max,
  IsInt,
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

import { ICoupon } from '../interfaces';

class CouponDTO implements ICoupon {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public barcode: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(0)
  @Max(100)
  public discountPercentage: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(0)
  @Max(1)
  public usageStatus: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public createdBy: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  public expiredIn: Date;

  constructor(
    barcode: string,
    discountPercentage: number,
    usageStatus: number,
    createdBy: string,
    expiredIn: Date,
  ) {
    this.barcode = barcode;
    this.createdBy = createdBy;
    this.expiredIn = expiredIn;
    this.usageStatus = usageStatus;
    this.discountPercentage = discountPercentage;
  }
}

export { CouponDTO };
