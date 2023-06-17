import { BaseEntity } from 'src/common/entities/base.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('ledger_entry')
export class LedgerEntryEntity extends BaseEntity {
  @Column('float')
  amount: number;

  @Column('boolean')
  fulfilled: boolean;

  // Might be changed later
  @Column('uuid')
  debtorId: string;

  // Might be changed later
  @Column('uuid')
  creditorId: string;

  @ManyToOne(
    () => TransactionEntity,
    (transaction) => transaction.ledgerEntries,
  )
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity;
}
