export class CreatePaymentDto {
  transactionId: string;
  contactId: string;
  description: string;
  date: Date;
  amount: number;
}
