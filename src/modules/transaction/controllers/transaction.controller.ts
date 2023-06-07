import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dtos/CreateTransaction.dto';
import { UpdateContactDto } from 'src/modules/contact/dtos/UpdateContact.dto';
import { toUnicode } from 'punycode';
import { UpdateTransactionDto } from '../dtos/UpdateContact.dto';
import { TransactionEntity } from '../entities/transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  createUserTransaction(
    @Body('transaction_details') transactionDetails: CreateTransactionDto,
  ) {
    return this.transactionService.createUserTransaction(transactionDetails);
  }

  // Questions:
  // - Should I move createUserTransaction/createUserContact to userController/service?
  // - Am I doing the update correctly? In teh dto teh fields are optional.
  // When I test just passing name or email in postman json it does still update
  // just not sure if its bst pract toUnicode. But if i do name?/email? these are both optional but
  // want teh suer to pass in one

  @Get()
  getContact(@Body('id') id: string): Promise<TransactionEntity> {
    return this.transactionService.getContact(id);
  }

  @Put()
  updateContact(
    @Body() transactionDetails: UpdateTransactionDto,
  ): Promise<TransactionEntity> {
    return this.transactionService.updateContact(transactionDetails);
  }

  @Delete()
  deleteUserByUuid(@Body('id') id: string) {
    return this.transactionService.deleteContact(id);
  }
}
