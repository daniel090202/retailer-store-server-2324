import { OrderDetailDTO } from '../dto';

declare global {
  interface IOrder {
    customerPhone: string;
    customerPayment: number;
    customerPaymentMethod: number;
    counterID: string;
    cashierUserName: string;
    couponsAmount: number;
    totalExpense: number;
    totalAmount: number;
    totalDiscount: number;
    exchange: number;
    notes: string;
    paymentStatus: number;
    shipmentBarcode: string;
    coupons: Array<string>;
    orderDetails: Array<OrderDetailDTO>;
  }
}

export { IOrder };
