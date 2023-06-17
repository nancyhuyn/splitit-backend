export class CreateLedgerEntryDto {
  debtorId: string;
  creditorId: string;
  transactionId: string;
  amount: number;
  fulfilled: boolean;
}
