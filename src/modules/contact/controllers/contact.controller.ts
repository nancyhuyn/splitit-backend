import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { ContactEntity } from '../entities/contact.entity';
import { UpdateContactDto } from '../dtos/UpdateContact.dto';
import { PaymentEntity } from 'src/modules/payment/entities/payment.entity';

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get(':uuid')
  getContact(@Param('uuid') id: string): Promise<ContactEntity> {
    return this.contactService.get(id);
  }

  @Get()
  getContacts(): Promise<ContactEntity[]> {
    return this.contactService.getAll();
  }

  @Put(':uuid')
  updateContact(
    @Param('uuid') id: string,
    @Body() contactDetails: UpdateContactDto,
  ): Promise<ContactEntity> {
    return this.contactService.update(id, contactDetails);
  }

  @Delete(':uuid')
  deleteUserByUuid(@Param('uuid') id: string) {
    return this.contactService.delete(id);
  }

  @Get(':uuid/payments')
  async getTransactions(@Param('uuid') id: string): Promise<PaymentEntity[]> {
    return (await this.contactService.getPayments(id)).payments;
  }
}
