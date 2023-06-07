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

  async createUserTransaction(
    transactionDetails: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const id = transactionDetails.userId;
    // Find user that this contact will belong to
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create a profile for this user',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = this.transactionRepository.create({
      ...transactionDetails,
      user,
    });
    return this.transactionRepository.save(newUser);
  }

  getContact(id: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOneBy({ id });
  }

  async updateContact(
    transactionDetails: UpdateTransactionDto,
  ): Promise<TransactionEntity> {
    const id = transactionDetails.id;
    // Find transaction that this transaction will belong to
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) {
      throw new HttpException('transaction not found.', HttpStatus.BAD_REQUEST);
    }

    return this.transactionRepository.save({
      ...transaction,
      ...transactionDetails,
    });
  }

  deleteContact(id: string) {
    return this.transactionRepository.delete(id);
  }
}
