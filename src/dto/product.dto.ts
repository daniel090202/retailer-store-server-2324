import {
  Min,
  Max,
  IsInt,
  Length,
  IsEmail,
  IsArray,
  IsString,
  IsNumber,
  IsNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

import { IProduct } from './product.interface';

class ProductDTO implements IProduct {
  @IsString()
  @IsNotEmpty()
  @Length(10)
  SKU: string;

  @IsString()
  @IsNotEmpty()
  @Length(12)
  UPC: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
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
  @Type(() => Array<string>)
  size: Array<string>;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => Array<string>)
  color: Array<string>;

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

  remainInventory: number = 0;
  soldQuantity: number = 0;

  displayLocation: Array<number> = [0];

  active: boolean = false;
  archived: boolean = false;
  verified: boolean = false;

  constructor(
    SKU: string,
    UPC: string,
    name: string,
    brand: string,
    forGender: number,
    category: Array<number>,
    size: Array<string>,
    color: Array<string>,
    originalPrice: number,
    salePrice: number,
    unit: number,
    initialInventory: number,
    minimumInventory: number,
    maximumInventory: number,
    storageLocation: Array<number>,
  ) {
    this.SKU = SKU;
    this.UPC = UPC;
    this.name = name;
    this.brand = brand;
    this.forGender = forGender;
    this.category = category;
    this.size = size;
    this.color = color;
    this.originalPrice = originalPrice;
    this.salePrice = salePrice;
    this.unit = unit;
    this.initialInventory = initialInventory;
    this.minimumInventory = minimumInventory;
    this.maximumInventory = maximumInventory;
    this.remainInventory = initialInventory;
    this.storageLocation = storageLocation;
  }
}

export { ProductDTO };
