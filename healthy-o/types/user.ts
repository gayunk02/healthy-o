import { Gender } from './health';

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
  marketingAgree: boolean;
} 