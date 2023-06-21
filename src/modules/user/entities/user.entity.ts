import { BaseEntity } from 'src/common/entities/base.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @OneToMany(() => ContactEntity, (contact) => contact.user, {
    onDelete: 'CASCADE',
  })
  contacts: ContactEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user, {
    onDelete: 'CASCADE',
  })
  transactions: TransactionEntity[];
}
