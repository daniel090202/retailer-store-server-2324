import { Type, Transform } from 'class-transformer';
import {
  Min,
  Max,
  IsInt,
  Length,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

import { IOrder } from '../interfaces';
import { OrderDetailDTO } from './orderDetail.dto';

class OrderDTO implements IOrder {
  @IsString()
  @IsNotEmpty()
  @Length(10, 12)
  public customerPhone: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  public customerPayment: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(0)
  @Max(2)
  public customerPaymentMethod: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public counterID: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public cashierUserName: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  public couponsAmount: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  public totalExpense: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  public totalAmount: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  public totalDiscount: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  public exchange: number;

  @IsString()
  @MaxLength(255)
  public notes: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(0)
  @Max(2)
  public paymentStatus: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public shipmentBarcode: string;

  @IsNotEmpty()
  @Type(() => String)
  coupons: Array<string>;

  @IsNotEmpty()
  @Type(() => OrderDetailDTO)
  orderDetails: Array<OrderDetailDTO>;

  constructor(
    customerPhone: string,
    customerPayment: number,
    customerPaymentMethod: number,
    counterID: string,
    cashierUserName: string,
    couponsAmount: number,
    totalExpense: number,
    totalAmount: number,
    totalDiscount: number,
    exchange: number,
    notes: string,
    paymentStatus: number,
    shipmentBarcode: string,
    coupons: Array<string>,
    orderDetails: Array<OrderDetailDTO>,
  ) {
    this.customerPhone = customerPhone;
    this.customerPayment = customerPayment;
    this.customerPaymentMethod = customerPaymentMethod;
    this.counterID = counterID;
    this.cashierUserName = cashierUserName;
    this.couponsAmount = couponsAmount;
    this.totalExpense = totalExpense;
    this.totalAmount = totalAmount;
    this.totalDiscount = totalDiscount;
    this.exchange = exchange;
    this.notes = notes;
    this.paymentStatus = paymentStatus;
    this.shipmentBarcode = shipmentBarcode;
    this.coupons = coupons;
    this.orderDetails = orderDetails;
  }
}

export { OrderDTO };
