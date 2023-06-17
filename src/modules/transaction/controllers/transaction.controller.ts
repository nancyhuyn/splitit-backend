import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { UpdateTransactionDto } from '../dtos/UpdateContact.dto';
import { TransactionEntity } from '../entities/transaction.entity';
import { PaymentEntity } from 'src/modules/payment/entities/payment.entity';
import { PaymentService } from 'src/modules/payment/services/payment.service';
import { CreatePaymentDto } from 'src/modules/payment/dtos/CreatePayment.dto';
import { CreateLedgerEntryDto } from 'src/modules/ledgerEntry/dtos/CreateLedgerEntry.dto';
import { LedgerEntryEntity } from 'src/modules/ledgerEntry/entities/ledgerEntry.entity';
import { LedgerEntryService } from 'src/modules/ledgerEntry/services/ledgerEntry.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private paymentService: PaymentService,
    private ledgerEntryService: LedgerEntryService,
  ) {}

  @Get(':uuid')
  getTransaction(@Param('uuid') id: string): Promise<TransactionEntity> {
    return this.transactionService.get(id);
  }

  @Put(':uuid')
  updateTransaction(
    @Param('uuid') id: string,
    @Body() transactionDetails: UpdateTransactionDto,
  ): Promise<TransactionEntity> {
    return this.transactionService.update(id, transactionDetails);
  }

  @Delete(':uuid')
  deleteTransaction(@Param('uuid') id: string) {
    return this.transactionService.delete(id);
  }

  @Post(':uuid/payments')
  createPayment(
    @Param('uuid') id: string,
    @Body('payment_details') paymentDetails: CreatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.create(id, paymentDetails);
  }

  @Get(':uuid/payments')
  async getPayments(@Param('uuid') id: string): Promise<PaymentEntity[]> {
    return (await this.transactionService.getPayments(id)).payments;
  }

  @Post(':uuid/ledgerentries')
  createLedgerEntry(
    @Param('uuid') id: string,
    @Body() ledgerEntryDetails: CreateLedgerEntryDto,
  ): Promise<LedgerEntryEntity> {
    return this.ledgerEntryService.create(id, ledgerEntryDetails);
  }

  @Get(':uuid/ledgerentries')
  async getLedgerEntry(
    @Param('uuid') id: string,
  ): Promise<LedgerEntryEntity[]> {
    return (await this.transactionService.getLedgerEntries(id)).ledgerEntries;
  }
}
