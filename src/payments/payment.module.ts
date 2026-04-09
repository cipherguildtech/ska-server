import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentServices } from './payment.service';
 

@Module({
  controllers: [PaymentController],
  providers: [PaymentServices],
})
export class PaymentModule {}
