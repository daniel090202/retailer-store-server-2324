import { OrderDTO } from '../dto';

declare global {
  interface ICounter {
    barcode: string;
    location: number;
  }
}

export { ICounter };
