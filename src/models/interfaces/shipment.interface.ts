import { OrderDTO } from '../dto';

declare global {
  interface IShipment {
    barcode: string;
    location: string;
    orders: Array<OrderDTO>;
  }
}

export { IShipment };
