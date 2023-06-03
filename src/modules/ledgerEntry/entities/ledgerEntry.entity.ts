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

  @ManyToOne(() => ContactEntity, (contact) => contact.debtor)
  @JoinColumn({ name: 'debtor' })
  debtor: TransactionEntity;

  @ManyToOne(() => ContactEntity, (contact) => contact.creditor)
  @JoinColumn({ name: 'creditor' })
  creditor: TransactionEntity;

  @ManyToOne(
    () => TransactionEntity,
    (transaction) => transaction.ledgerEntries,
  )
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity;
}
