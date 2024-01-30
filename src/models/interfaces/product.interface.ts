import { ProductDetailDTO } from '../dto';

declare global {
  interface IProduct {
    UPC: string;
    name: string;
    brand: string;
    forGender: number;
    category: Array<number>;
    originalPrice: number;
    salePrice: number;
    unit: number;
    details: Array<ProductDetailDTO>;

    active: boolean;
    archived: boolean;
    verified: boolean;
  }
}

export { IProduct };
