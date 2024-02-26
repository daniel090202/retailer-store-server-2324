import { User } from '@prisma/client';

const ExcludeUserProperties = (
  user: User,
): {
  id: number;
  email: string;
  gender: number;
  age: number;
  phone: string;
  address: number;
  position: number;
  userName: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  admin: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
} => {
  const { hashedPassword, ...props } = user;

  return props;
};

export { ExcludeUserProperties };
