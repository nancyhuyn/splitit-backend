import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserContactParams } from 'src/utils/types';
import { LedgerEntryEntity } from '../entities/ledgerEntry.entity';

@Injectable()
export class LedgerEntryService {
  constructor(
    @InjectRepository(LedgerEntryEntity)
    private ledgerEntryRepository: Repository<LedgerEntryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // async getUserContacts(id: string): Promise<ContactEntity[]> {
  //   const user = await this.userRepository.findOneBy({ id });

  //   return user.contacts;
  // }

  // updateUser(id: string, contactDetails: CreateUserDto) {
  //   return this.userRepository.update(
  //     { id },
  //     {
  //       ...userDetails,
  //     },
  //   );
  // }

  // deleteUser(id: string) {
  //   return this.userRepository.delete({ id });
  // }
}
