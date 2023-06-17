import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dtos/CreatePayment.dto';
import { PaymentEntity } from '../entities/payment.entity';
import { UpdatePaymentDto } from '../dtos/UpdatePayment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get(':uuid')
  getPayment(@Param('uuid') id: string): Promise<PaymentEntity> {
    return this.paymentService.get(id);
  }

  @Put(':uuid')
  updatePayment(
    @Param('uuid') id: string,
    @Body() paymentDetails: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.update(id, paymentDetails);
  }

  @Delete(':uuid')
  deletePayment(@Param('uuid') id: string) {
    return this.paymentService.delete(id);
  }
}
