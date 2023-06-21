import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../entities/contact.entity';
import { CreateContactDto } from '../dtos/CreateContact.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UpdateContactDto } from '../dtos/UpdateContact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(
    id: string,
    contactDetails: CreateContactDto,
  ): Promise<ContactEntity> {
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

  get(id: string): Promise<ContactEntity> {
    return this.contactRepository.findOneBy({ id });
  }

  getAll(): Promise<ContactEntity[]> {
    return this.contactRepository.find();
  }

  async update(
    id: string,
    contactDetails: UpdateContactDto,
  ): Promise<ContactEntity> {
    // Find user that this contact will belong to
    const user = await this.contactRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('contact not found.', HttpStatus.BAD_REQUEST);
    }

    return this.contactRepository.save({ ...user, ...contactDetails });
  }

  delete(id: string) {
    return this.contactRepository.delete(id);
  }

  getPayments(id: string) {
    return this.contactRepository.findOne({
      where: { id },
      relations: { payments: true },
    });
  }
}
