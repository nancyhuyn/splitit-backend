import { BaseEntity } from 'src/common/entities/base.entity';
import { LedgerEntryEntity } from 'src/modules/ledgerEntry/entities/ledgerEntry.entity';
import { PaymentEntity } from 'src/modules/payment/entities/payment.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('transaction')
export class TransactionEntity extends BaseEntity {
  @Column('varchar', { nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.transaction)
  payments: PaymentEntity[];

  @OneToMany(() => LedgerEntryEntity, (ledgerEntry) => ledgerEntry.transaction)
  ledgerEntries: LedgerEntryEntity[];
}
