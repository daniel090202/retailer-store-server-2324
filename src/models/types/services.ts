declare global {
  type ReturnValue = {
    statusCode: number;
    message: string;
    data?: any;
  };
}

export type { ReturnValue };
