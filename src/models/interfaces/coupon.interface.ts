declare global {
  interface ICoupon {
    orderID?: number;
    barcode: string;
    owner?: string;
    discountPercentage: number;
    usageStatus: number;
    createdBy: string;
    expiredIn: Date;
  }
}

export { ICoupon };
