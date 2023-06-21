import { BaseEntity } from 'src/common/entities/base.entity';
import { LedgerEntryEntity } from 'src/modules/ledgerEntry/entities/ledgerEntry.entity';
import { PaymentEntity } from 'src/modules/payment/entities/payment.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('contact')
export class ContactEntity extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  // This is the user that the contact belongs to
  @ManyToOne(() => UserEntity, (user) => user.contacts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.contact, {
    onDelete: 'CASCADE',
  })
  payments: PaymentEntity[];
}
