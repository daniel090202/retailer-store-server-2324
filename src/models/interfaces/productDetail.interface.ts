declare global {
  interface IProductDetail {
    UPC: string;
    SKU: string;
    size: string;
    color: string;
    initialInventory: number;
    minimumInventory: number;
    maximumInventory: number;
    remainInventory: number;
    soldQuantity: number;
    storageLocation: Array<number>;
    displayLocation: Array<number>;
  }
}

export { IProductDetail };
