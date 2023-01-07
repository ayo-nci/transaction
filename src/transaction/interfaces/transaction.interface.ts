import { Document } from 'mongoose';

export interface TransactionDocument extends Document {
  readonly from_currency: string;
  readonly from_amount: number;
  readonly to_currency: string;
  readonly to_amount: number;
  readonly date: Date;
  readonly price_type: string;
}
