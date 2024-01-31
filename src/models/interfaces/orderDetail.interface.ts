declare global {
  interface IOrderDetail {
    productSKU: string;
    purchasedQuantity: number;
    totalExpense: number;
    notes: string;
  }
}

export { IOrderDetail };
