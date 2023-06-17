import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/CreateTransaction.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UpdateTransactionDto } from '../dtos/UpdateContact.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(
    id: string,
    transactionDetails: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create a transaction for this user',
        HttpStatus.BAD_REQUEST,
      );
    }
    const transaction = this.transactionRepository.create({
      ...transactionDetails,
      user,
    });
    return this.transactionRepository.save(transaction);
  }

  get(id: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOneBy({ id });
  }

  async update(
    id: string,
    transactionDetails: UpdateTransactionDto,
  ): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) {
      throw new HttpException('transaction not found.', HttpStatus.BAD_REQUEST);
    }

    return this.transactionRepository.save({
      ...transaction,
      ...transactionDetails,
    });
  }

  delete(id: string) {
    return this.transactionRepository.delete(id);
  }

  getPayments(id: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOne({
      where: { id },
      relations: { payments: true },
    });
  }

  getLedgerEntries(id: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOne({
      where: { id },
      relations: { ledgerEntries: true },
    });
  }
}
