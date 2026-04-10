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
    
    @Get('all_by_project_status/:id/:status')
    getAllByProjectStatus(@Param('id') id:string, @Param('status') status:string){
        return this.quotationService.getAllByProjectStatus(id, status);
    }
    @Put('update_status/:id/:status')
    updateStatus(@Param('id') id:string, @Param('status') status:string){
        return this.quotationService.updateStatus(id, status);
    }
    @Get('all_by_status')
    getAllByStatus(@Param('status') status:string){
        return this.quotationService.getAllByStatus(status);
    }

}