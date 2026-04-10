import { Controller , Get, Post, Param, Put, Body, Delete} from "@nestjs/common";
import {CustomersService} from "./customers.service";
import { customerCreationDto } from "./DTO/customerCreationDTO";

@Controller('customers')
export class CustomersContoller {
    constructor( private readonly customersService: CustomersService) { }

    @Get('count')
    async getCustomersCount() {
        return await this.customersService.getCustomersCount();
    }

    @Get('recent_customers')
    async getRecentCustomers() {
        return await this.customersService.getRecentCustomers();
    }

    @Get()
    async getCustomers(){
        return await this.customersService.getCustomers();
    }

    @Post()
    async createCustomer(@Body() requestBody: customerCreationDto) {
        return await this.customersService.createCustomer(requestBody);
    }

    @Get(':id')
    async getCustomer(@Param('id') id: string) {
        return await this.customersService.getCustomer(id);
    }

    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() requestBody: {}){
        return await this.customersService.updateCustomer(id, requestBody);
    }

}