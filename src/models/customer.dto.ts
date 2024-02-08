import {
  Min,
  Max,
  IsInt,
  Length,
  IsEmail,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

declare global {
  interface ICustomer {
    email: string;
    gender: number;
    age: number;
    phone: string;
    address: string;
    customerName: string;
    accountLevel: number;
    active: boolean;
    block: boolean;
    verified: boolean;
  }
}

class CustomerDTO implements ICustomer {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  @Min(0)
  @Max(2)
  gender: number;

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  @Min(20)
  @Max(45)
  age: number;

  @IsString()
  @IsNotEmpty()
  @Length(10, 12)
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  customerName: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(0)
  @Max(3)
  accountLevel: number;

  active: boolean = false;
  block: boolean = false;
  verified: boolean = false;

  constructor(
    email: string,
    gender: number,
    age: number,
    phone: string,
    address: string,
    customerName: string,
    accountLevel: number,
    active: boolean = false,
    block: boolean = false,
    verified: boolean = false,
  ) {
    this.email = email;
    this.gender = gender;
    this.age = age;
    this.phone = phone;
    this.address = address;
    this.customerName = customerName;
    this.accountLevel = accountLevel;
    this.active = active;
    this.block = block;
    this.verified = verified;
  }
}

export { CustomerDTO };
