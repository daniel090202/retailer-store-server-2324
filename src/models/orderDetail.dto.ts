import {
  IsInt,
  Length,
  IsArray,
  IsString,
  IsNotEmpty,
  ArrayMinSize,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

declare global {
  interface IOrderDetail {
    productSKU: string;
    purchasedQuantity: number;
    totalExpense: number;
    notes: string;
  }
}

class OrderDetailDTO implements IOrderDetail {
  @IsString()
  @IsNotEmpty()
  @Length(10)
  public productSKU: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  public purchasedQuantity: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  public totalExpense: number;

  @IsString()
  @IsNotEmpty()
  @Length(255)
  public notes: string;

  constructor(
    productSKU: string,
    purchasedQuantity: number,
    totalExpense: number,
    notes: string,
  ) {
    this.productSKU = productSKU;
    this.purchasedQuantity = purchasedQuantity;
    this.totalExpense = totalExpense;
    this.notes = notes;
  }
}

export { OrderDetailDTO };
