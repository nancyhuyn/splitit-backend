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
import { CreateUserDto } from 'src/modules/user/dtos/CreateUser.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/UpdateUser.dto';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { CreateContactDto } from 'src/modules/contact/dtos/CreateContact.dto';
import { ContactService } from 'src/modules/contact/services/contact.service';
import { CreateTransactionDto } from 'src/modules/transaction/dtos/CreateTransaction.dto';
import { TransactionService } from 'src/modules/transaction/services/transaction.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private transactionService: TransactionService,
  ) {}

  @Post()
  createUser(
    @Body('user_details') userDetails: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.create(userDetails).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':uuid')
  getUser(@Param('uuid') id: string): Promise<UserEntity> {
    return this.userService.get(id);
  }

  @Put(':uuid')
  updateUser(
    @Param('uuid') id: string,
    @Body() userDetails: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, userDetails);
  }

  @Delete(':uuid')
  deleteUser(@Param('uuid') id: string) {
    return this.userService.delete(id);
  }

  @Post(':uuid/contacts')
  createContact(
    @Param('uuid') userId: string,
    @Body('contact_details') contactDetails: CreateContactDto,
  ): Promise<ContactEntity> {
    return this.contactService.create(userId, contactDetails);
  }

  @Get(':uuid/contacts')
  async getContacts(
    @Param('uuid', ParseUUIDPipe) id: string,
  ): Promise<ContactEntity[]> {
    return this.userService
      .getUserContacts(id)
      .then((res) => {
        return res.contacts;
      })
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
    // add error handling
    // update .findOne() -> findOneOrFail() for all other entities
  }

  @Post(':uuid/transactions')
  createUserTransaction(
    @Param('uuid') id: string,
    @Body('transaction_details') transactionDetails: CreateTransactionDto,
  ) {
    return this.transactionService.create(id, transactionDetails);
  }

  @Get(':uuid/transactions')
  async getTransactions(
    @Param('uuid', ParseUUIDPipe) id: string,
  ): Promise<TransactionEntity[]> {
    return (await this.userService.getUserTransactions(id)).transactions;
  }
}
