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
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dtos/CreatePayment.dto';
import { PaymentEntity } from '../entities/payment.entity';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  createTransactionPayment(
    @Body('payment_details') paymentDetails: CreatePaymentDto,
  ) {
    this.paymentService.createTransactionPayment(paymentDetails);
  }

  // @Get()
  // getContact(@Body('id') id: string): Promise<ContactEntity> {
  //   return this.contactService.getContact(id);
  // }

  // @Put()
  // updateContact(
  //   @Body() contactDetails: UpdateContactDto,
  // ): Promise<ContactEntity> {
  //   return this.contactService.updateContact(contactDetails);
  // }

  // @Delete()
  // deleteUserByUuid(@Body('id') id: string) {
  //   return this.contactService.deleteContact(id);
  // }
}
