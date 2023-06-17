import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { CreatePaymentDto } from '../dtos/CreatePayment.dto';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { UpdatePaymentDto } from '../dtos/UpdatePayment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  async create(
    id: string,
    paymentDetails: CreatePaymentDto,
  ): Promise<PaymentEntity> {
    const transaction = await this.transactionRepository.findOneBy({
      id,
    });
    if (!transaction) {
      throw new HttpException(
        'Transaction not found. Cannot create a payment for this transaction',
        HttpStatus.BAD_REQUEST,
      );
    }

    const contactId = paymentDetails.contactId;
    const contact = await this.contactRepository.findOneBy({ id: contactId });
    if (!contact) {
      throw new HttpException(
        'Contact not found. Cannot create a payment to this contact',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPayment = this.paymentRepository.create({
      ...paymentDetails,
      transaction,
      contact,
    });

    return this.paymentRepository.save(newPayment);
  }

  get(id: string): Promise<PaymentEntity> {
    return this.paymentRepository.findOneBy({ id });
  }

  async update(
    id: string,
    paymentDetails: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new HttpException('payment not found.', HttpStatus.BAD_REQUEST);
    }

    return this.paymentRepository.save({ ...payment, ...paymentDetails });
  }

  delete(id: string) {
    return this.paymentRepository.delete(id);
  }
}
