import { BaseEntity } from 'src/common/entities/base.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('payment')
export class PaymentEntity extends BaseEntity {
  @Column('varchar', { nullable: true })
  description: string;

  @Column('float', { nullable: true })
  amount: number;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.payments)
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity;

  @ManyToOne(() => ContactEntity, (contact) => contact.payments)
  @JoinColumn({ name: 'contact_id' })
  contact: ContactEntity;
}
