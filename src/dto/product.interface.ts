interface IProduct {
  SKU: string;
  UPC: string;
  name: string;
  brand: string;
  forGender: number;
  category: Array<number>;
  size: Array<string>;
  color: Array<string>;
  originalPrice: number;
  salePrice: number;
  unit: number;
  initialInventory: number;
  minimumInventory: number;
  maximumInventory: number;
  remainInventory: number;
  soldQuantity: number;
  storageLocation: Array<number>;
  displayLocation: Array<number>;

  active: boolean;
  archived: boolean;
  verified: boolean;
}

export { IProduct };
