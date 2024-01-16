declare global {
  interface ICustomer {
    email: string;
    gender: number;
    age: number;
    phone: string;
    address: string;
    customerName: string;
    accountLevel: number;
    active: boolean;
    block: boolean;
    verified: boolean;
  }
}

export { ICustomer };
