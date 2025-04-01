import { Document } from 'mongoose';

export interface ITip extends Document {
  sender: {
    name: string;
    email: string;
  };
  recipient: {
    name: string;
    email?: string;
  };
  amount: number;
  message?: string;
  createdAt: Date;
}

export interface ISubscription extends Document {
  email: string;
  createdAt: Date;
} 