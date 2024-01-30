import { Type } from 'class-transformer';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

import { OrderDTO } from './order.dto';
import { IShipment } from '../interfaces';

class ShipmentDTO implements IShipment {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public barcode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public location: string;

  @IsNotEmpty()
  @Type(() => Array<OrderDTO>)
  public orders: Array<OrderDTO>;

  constructor(barcode: string, location: string, orders: Array<OrderDTO>) {
    this.barcode = barcode;
    this.location = location;
    this.orders = orders;
  }
}

export { ShipmentDTO };
