import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactiondocDocument = Transactiondoc & Document;

@Schema({ collection: 'Transactiondoc' })
export class Transactiondoc {
  @Prop()
  from_currency: string;

  @Prop()
  from_amount: number;

  @Prop()
  to_currency: string;

  @Prop()
  to_amount: number;

  @Prop()
  date: Date;

  @Prop()
  price_tye: string;
}

export const TransactiondocsSchema =
  SchemaFactory.createForClass(Transactiondoc);
