export class CreateTransactionDTO {
  from_currency: string;
  from_amount: number;
  to_currency: string;
  to_amount: number;
  price_type: string;
  date: Date;
  _id: string;
  __v: string;
}
