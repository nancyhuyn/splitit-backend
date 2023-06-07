import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { CreateContactDto } from '../dtos/CreateContact.dto';
import { ContactEntity } from '../entities/contact.entity';
import { UpdateContactDto } from '../dtos/UpdateContact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  createUserContact(
    @Body('contact_details') contactDetails: CreateContactDto,
  ): Promise<ContactEntity> {
    return this.contactService.createUserContact(contactDetails);
  }

  @Get()
  getContact(@Body('id') id: string): Promise<ContactEntity> {
    return this.contactService.getContact(id);
  }

  @Put()
  updateContact(
    @Body() contactDetails: UpdateContactDto,
  ): Promise<ContactEntity> {
    return this.contactService.updateContact(contactDetails);
  }

  @Delete()
  deleteUserByUuid(@Body('id') id: string) {
    return this.contactService.deleteContact(id);
  }
}
