import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LedgerEntryEntity } from '../entities/ledgerEntry.entity';
import { CreateLedgerEntryDto } from '../dtos/CreateLedgerEntry.dto';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { UpdateLedgerEntryDto } from '../dtos/UpdateLedgerEntry.dto';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';

@Injectable()
export class LedgerEntryService {
  constructor(
    @InjectRepository(LedgerEntryEntity)
    private ledgerEntryRepository: Repository<LedgerEntryEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  async create(
    id: string,
    ledgerEntryDetails: CreateLedgerEntryDto,
  ): Promise<LedgerEntryEntity> {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) {
      throw new HttpException(
        'Transaction not found. Cannot create a ledger entry for this transaction',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newLedgerEntry = this.ledgerEntryRepository.create({
      ...ledgerEntryDetails,
      transaction,
    });

    return this.ledgerEntryRepository.save(newLedgerEntry);
  }

  getAll(): Promise<LedgerEntryEntity[]> {
    return this.ledgerEntryRepository.find();
  }

  get(id: string): Promise<LedgerEntryEntity> {
    return this.ledgerEntryRepository.findOneBy({ id });
  }

  async update(
    id: string,
    ledgerEntryDetails: UpdateLedgerEntryDto,
  ): Promise<LedgerEntryEntity> {
    const ledgerEntry = await this.ledgerEntryRepository.findOneBy({ id });
    if (!ledgerEntry) {
      throw new HttpException(
        'Ledger Entry not found.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.ledgerEntryRepository.save({
      ...ledgerEntry,
      ...ledgerEntryDetails,
    });
  }

  delete(id: string) {
    return this.ledgerEntryRepository.delete(id);
  }
}
