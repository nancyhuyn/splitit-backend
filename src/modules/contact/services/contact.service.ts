import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../entities/contact.entity';
import { CreateContactDto } from '../dtos/CreateContact.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserContactParams } from 'src/utils/types';
import { UpdateContactDto } from '../dtos/UpdateContact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUserContact(
    contactDetails: CreateContactDto,
  ): Promise<ContactEntity> {
    const id = contactDetails.userId;
    // Find user that this contact will belong to
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create a profile for this user',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newContact = this.contactRepository.create({
      ...contactDetails,
      user,
    });
    return this.contactRepository.save(newContact);
  }

  getContact(id: string): Promise<ContactEntity> {
    return this.contactRepository.findOneBy({ id });
  }

  async updateContact(
    contactDetails: UpdateContactDto,
  ): Promise<ContactEntity> {
    const id = contactDetails.id;
    // Find user that this contact will belong to
    const user = await this.contactRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('contact not found.', HttpStatus.BAD_REQUEST);
    }

    return this.contactRepository.save({ ...user, ...contactDetails });
  }

  deleteContact(id: string) {
    return this.contactRepository.delete(id);
  }
}
