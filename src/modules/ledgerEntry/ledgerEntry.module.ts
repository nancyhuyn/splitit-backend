import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LedgerEntryEntity } from './entities/ledgerEntry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LedgerEntryEntity])],
  controllers: [],
  providers: [],
})
export class LedgerEntryModule {}
