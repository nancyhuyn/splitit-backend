import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { CreatePaymentDto } from '../dtos/CreatePayment.dto';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<TransactionEntity>,
  ) {}

  async createTransactionPayment(paymentDetails: CreatePaymentDto) {
    const transactionId = paymentDetails.transactionId;
    const transaction = await this.transactionRepository.findOneBy({
      id: transactionId,
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

    console.log({
      ...paymentDetails,
      transaction,
      contact,
    });

    const newPayment = this.paymentRepository.create({
      ...paymentDetails,
      transaction,
      contact,
    });

    //const newPayment = new PaymentEntity();

    return this.contactRepository.save(newPayment);
  }

  // getContact(id: string): Promise<ContactEntity> {
  //   return this.contactRepository.findOneBy({ id });
  // }

  // async updateContact(
  //   contactDetails: UpdateContactDto,
  // ): Promise<ContactEntity> {
  //   const id = contactDetails.id;
  //   // Find user that this contact will belong to
  //   const user = await this.contactRepository.findOneBy({ id });
  //   if (!user) {
  //     throw new HttpException('contact not found.', HttpStatus.BAD_REQUEST);
  //   }

  //   return this.contactRepository.save({ ...user, ...contactDetails });
  // }

  // deleteContact(id: string) {
  //   return this.contactRepository.delete(id);
  // }
}
