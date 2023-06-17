import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ContactEntity } from '../contact/entities/contact.entity';
import { ContactService } from '../contact/services/contact.service';
import { TransactionEntity } from '../transaction/entities/transaction.entity';
import { TransactionService } from '../transaction/services/transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ContactEntity, TransactionEntity]),
  ],
  controllers: [UsersController],
  providers: [UserService, ContactService, TransactionService],
})
export class UsersModule {}
