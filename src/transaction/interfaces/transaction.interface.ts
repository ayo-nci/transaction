import { Document } from 'mongoose';

export interface TransactionDocument extends Document {
  readonly from_currency: string;
  readonly from_amount: number;
  readonly to_currency: string;
  readonly to_amount: number;
  readonly price_type: string;
  readonly date: Date;
  readonly _id: string;
  readonly __v: string;
}
