import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { PaymentServices } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentServices) {}
    @Get('all')
    getAll() {
        return this.paymentService.getAll();
    }
    @Post()
  async create(
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(dto);
  }
    @Get('all_by_project/:id')
    getAllByProject(@Param('id') id: string) {
        return this.paymentService.getAllByProject(id);
    }

}