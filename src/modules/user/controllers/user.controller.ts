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

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(
    @Body('user_details') userDetails: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(userDetails).catch((err) => {
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
    return this.userService.getUsers();
  }

  @Put()
  updateUser(@Body() userDetails: UpdateUserDto): Promise<UserEntity> {
    return this.userService.updateUser(userDetails);
  }

  @Delete()
  deleteUserByUuid(@Body('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get(':uuid/contacts')
  async getUserContacts(
    @Param('uuid', ParseUUIDPipe) id: string,
  ): Promise<ContactEntity[]> {
    return (await this.userService.getUserContacts(id)).contacts;
  }

  @Get(':uuid/transactions')
  async getUserTransactions(
    @Param('uuid', ParseUUIDPipe) id: string,
  ): Promise<TransactionEntity[]> {
    return (await this.userService.getUserTransactions(id)).transactions;
  }
}
