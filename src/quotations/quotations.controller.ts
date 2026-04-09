import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { QuotationServices } from "./quotations.service";
 
@Controller('quotation')
export class QuotationController {
    constructor(private readonly quotationService: QuotationServices) { }
    @Get('all')
    getAll() {
        return this.quotationService.getAll();
    }

    @Post('create')
    create(@Body() body: any) {
        return this.quotationService.create(body);
    }
    
    @Put('update/:id')
    update(@Param('id') id:string,@Body() body:any){
return this.quotationService.update(id,body);
    }
}