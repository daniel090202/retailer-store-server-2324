import {
  Min,
  Max,
  Length,
  IsInt,
  IsEmail,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { IUser, ILogin } from '../interfaces';

class UserDTO implements IUser {
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
  @Length(10)
  phone: string;

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  @Min(0)
  @Max(2)
  address: number;

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  @Min(0)
  @Max(2)
  position: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  lastName: string;

  @IsString()
  @Length(2, 15)
  middleName: string;

  userName: string;
  admin: boolean = false;
  active: boolean = false;
  archived: boolean = false;
  verified: boolean = false;

  constructor(
    email: string,
    gender: number,
    age: number,
    phone: string,
    address: number,
    position: number,
    userName: string,
    firstName: string,
    lastName: string,
    middleName: string,
    admin: boolean = false,
    active: boolean = false,
    archived: boolean = false,
    verified: boolean = false,
  ) {
    this.email = email;
    this.gender = gender;
    this.age = age;
    this.phone = phone;
    this.address = address;
    this.position = position;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.admin = admin;
    this.active = active;
    this.archived = archived;
    this.verified = verified;
  }
}

class LoginDTO implements ILogin {
  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string;

  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }
}

export { UserDTO, LoginDTO };
