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

    @Get('projects/:phone')
    async getCustomerProjects(@Param('phone') phone: string) {
        return await this.customersService.getCustomerProjects(phone);
    }

    @Get('customer_with_project_count/:phone') 
    async getCustomerWithProjectCount(@Param('phone') phone: string) {
        return await this.customersService.getCustomerWithProjectCount(phone);
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

    @Get(':phone')
    async getCustomer(@Param('phone') phone: string) {
        return await this.customersService.getCustomer(phone);
    }

    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() requestBody: {}){
        return await this.customersService.updateCustomer(id, requestBody);
    }

}