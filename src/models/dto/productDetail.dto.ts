import { Type, Transform } from 'class-transformer';
import {
  IsInt,
  Length,
  IsArray,
  IsString,
  IsNotEmpty,
  ArrayMinSize,
} from 'class-validator';

import { IProductDetail } from '../interfaces';

class ProductDetailDTO implements IProductDetail {
  @IsString()
  @IsNotEmpty()
  @Length(10)
  UPC: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  SKU: string;

  @IsArray()
  @IsNotEmpty()
  size: string;

  @IsArray()
  @IsNotEmpty()
  color: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  initialInventory: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  minimumInventory: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  maximumInventory: number;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => Array<number>)
  @Transform(({ value }) => {
    const newStorageLocation: Array<number> = [];

    value.forEach((element: string) => {
      newStorageLocation.push(parseInt(element, 10));
    });

    return newStorageLocation;
  })
  storageLocation: Array<number>;

  soldQuantity: number = 0;
  remainInventory: number = 0;

  displayLocation: Array<number> = [0];

  constructor(
    UPC: string,
    SKU: string,
    size: string,
    color: string,
    initialInventory: number,
    minimumInventory: number,
    maximumInventory: number,
    storageLocation: Array<number>,
  ) {
    this.UPC = UPC;
    this.SKU = SKU;
    this.size = size;
    this.color = color;
    this.initialInventory = initialInventory;
    this.minimumInventory = minimumInventory;
    this.maximumInventory = maximumInventory;
    this.remainInventory = initialInventory;
    this.storageLocation = storageLocation;
  }
}

export { ProductDetailDTO };
