import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { UserEntity } from '../user/entities/user.entity';
import { PaymentService } from '../payment/services/payment.service';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { ContactEntity } from '../contact/entities/contact.entity';
import { LedgerEntryEntity } from '../ledgerEntry/entities/ledgerEntry.entity';
import { LedgerEntryService } from '../ledgerEntry/services/ledgerEntry.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      UserEntity,
      PaymentEntity,
      ContactEntity,
      LedgerEntryEntity,
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, PaymentService, LedgerEntryService],
})
export class TransactionModule {}
