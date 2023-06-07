import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity, UserEntity])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
