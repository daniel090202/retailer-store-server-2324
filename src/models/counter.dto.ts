import {
  Min,
  Max,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

declare global {
  interface ICounter {
    barcode: string;
    location: number;
  }
}

class CounterDTO implements ICounter {
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
  @Max(10)
  public location: number;

  constructor(barcode: string, location: number) {
    this.barcode = barcode;
    this.location = location;
  }
}

export { CounterDTO };
