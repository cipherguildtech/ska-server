import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { QuotationServices } from "./quotations.service";
import { CreateQuotationDto } from './dto/create-quotation.dto';
 
@Controller('quotation')
export class QuotationController {
    constructor(private readonly quotationService: QuotationServices) { }
    @Get('all')
    getAll() {
        return this.quotationService.getAll();
    }
 @Get('all_by_id/:id')
    getAllById(@Param('id') id:string){
        return this.quotationService.getAllById(id);
    }
    @Post('create')
  async create(
    @Body() dto: CreateQuotationDto,
  ) {
    return this.quotationService.createQuotation(dto);
  }
    
    @Put('update/:id')
    update(@Param('id') id:string,@Body() body:any){
return this.quotationService.update(id,body);
    }
    
    @Get('all_by_project_status/:id/:status')
    getAllByProjectStatus(@Param('id') id:string, @Param('status') status:string){
        return this.quotationService.getAllByProjectStatus(id, status);
    }
    @Put('update_status/:id/:status')
    updateStatus(@Param('id') id:string, @Param('status') status:string){
        return this.quotationService.updateStatus(id, status);
    }
    @Get('all_by_status/:status')
    getAllByStatus(@Param('status') status:string){
        return this.quotationService.getAllByStatus(status);
    }
    @Get('all_by_code/:code')
    getAllBycode(@Param('code') code:string){
        return this.quotationService.getAllBycode(code);
    }

}