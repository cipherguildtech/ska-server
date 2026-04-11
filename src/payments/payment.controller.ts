import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { PaymentServices } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentServices) {}
    @Get('all')
    getAll() {
        return this.paymentService.getAll();
    }
    @Post('create')
    create(@Body() paymentData: any) {
        return this.paymentService.create(paymentData);
    }
    @Get('all_by_project/:id')
    getAllByProject(@Param('id') id: string) {
        return this.paymentService.getAllByProject(id);
    }

}