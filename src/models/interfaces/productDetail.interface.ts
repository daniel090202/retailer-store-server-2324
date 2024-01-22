declare global {
  interface IProductDetail {
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
