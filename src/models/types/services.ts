declare global {
  type ReturnValue = {
    statusCode: number;
    message: string;
  };
}

export type { ReturnValue };
