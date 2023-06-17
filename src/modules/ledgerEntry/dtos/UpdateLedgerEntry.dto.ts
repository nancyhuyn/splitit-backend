export class UpdateLedgerEntryDto {
  debtorId: string;
  credtorId: string;
  transactionId: string;
  amount: number;
  fulfilled: boolean;
}
