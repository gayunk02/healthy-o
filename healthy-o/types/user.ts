export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  gender: 'M' | 'F';
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
  marketingAgree: boolean;
} 