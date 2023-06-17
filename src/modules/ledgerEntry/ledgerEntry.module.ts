import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LedgerEntryEntity } from './entities/ledgerEntry.entity';
import { LedgerEntryService } from './services/ledgerEntry.service';
import { TransactionEntity } from '../transaction/entities/transaction.entity';
import { LedgerEntryController } from './controllers/ledgerEntry.controller';
import { ContactEntity } from '../contact/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LedgerEntryEntity,
      TransactionEntity,
      ContactEntity,
    ]),
  ],
  controllers: [LedgerEntryController],
  providers: [LedgerEntryService],
})
export class LedgerEntryModule {}
