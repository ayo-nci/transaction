export class CreateTransactionDTO {
  from_currency: string;
  from_amount: number;
  readonly to_currency: string;
  readonly to_amount: number;
  readonly price_type: string;
}
