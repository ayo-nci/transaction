export class CreateTransactionDTO {
  from_currency: string;
  from_amount: number;
  to_currency: string;
  to_amount: number;
  date: Date;
  price_type: string;
}
