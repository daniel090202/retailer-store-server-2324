import {
  Min,
  Max,
  IsInt,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

declare global {
  interface INotification {
    title: string;
    target: number;
    degree: number;
    type: number;
    content: string;
    createdBy: string;
  }
}

class NotificationDTO implements INotification {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public title: string;

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  @Min(0)
  @Max(2)
  public target: number;

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  @Min(0)
  @Max(3)
  public degree: number;

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  public type: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public createdBy: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public content: string;

  public hiddenStatus: boolean = false;

  constructor(
    title: string,
    target: number,
    degree: number,
    type: number,
    createdBy: string,
    content: string,
  ) {
    this.title = title;
    this.target = target;
    this.degree = degree;
    this.type = type;
    this.createdBy = createdBy;
    this.content = content;
  }
}

export { NotificationDTO };
