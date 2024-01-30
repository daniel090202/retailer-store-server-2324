import {
  IsInt,
  Length,
  IsArray,
  IsString,
  IsNotEmpty,
  ArrayMinSize,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

import { IProduct } from '../interfaces';
import { ProductDetailDTO } from './productDetail.dto';

class ProductDTO implements IProduct {
  @IsString()
  @IsNotEmpty()
  @Length(12)
  UPC: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  brand: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  forGender: number;

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
  category: Array<number>;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  originalPrice: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  salePrice: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  unit: number;

  @IsNotEmpty()
  @Type(() => ProductDetailDTO)
  @Transform(({ value }) => {
    const newDetails: Array<{
      color: string;
      size: string;
      initialInventory: number;
      minimumInventory: number;
      maximumInventory: number;
      remainInventory: number;
    }> = [];

    value.forEach(
      (element: {
        color: string;
        size: string;
        initialInventory: number;
        minimumInventory: number;
        maximumInventory: number;
      }) => {
        newDetails.push({
          ...element,
          remainInventory: element.initialInventory,
        });
      },
    );

    return newDetails;
  })
  details: Array<ProductDetailDTO>;

  active: boolean = false;
  archived: boolean = false;
  verified: boolean = false;

  constructor(
    UPC: string,
    name: string,
    brand: string,
    forGender: number,
    category: Array<number>,
    originalPrice: number,
    salePrice: number,
    unit: number,
    details: Array<ProductDetailDTO>,
  ) {
    this.UPC = UPC;
    this.name = name;
    this.brand = brand;
    this.forGender = forGender;
    this.category = category;
    this.originalPrice = originalPrice;
    this.salePrice = salePrice;
    this.unit = unit;
    this.details = details;
  }
}

export { ProductDTO };
