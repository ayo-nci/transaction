// .src/transaction/schemas/transaction.schema.ts
import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  from_currency: String,
  from_amount: Number,
  to_currency: String,
  to_amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  price_type: String,
});
