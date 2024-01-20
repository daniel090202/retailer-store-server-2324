declare global {
  interface IUser {
    email: string;
    gender: number;
    age: number;
    phone: string;
    address: number;
    position: number;
    userName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    admin: boolean;
    active: boolean;
    archived: boolean;
    verified: boolean;
  }

  interface ILogin {
    userName: string;
    password: string;
  }
}

export { IUser, ILogin };
