import { Controller , Get, Post, Param, Put, Body, Delete} from "@nestjs/common";
import {CustomersService} from "./customers.service";
import { request } from "node:https";

@Controller('customers')
export class CustomersContoller {
    constructor( private readonly customersService: CustomersService) { }

    @Get()
    async getCustomers(){
        return await this.customersService.getCustomers();
    }

    @Post()
    async createCustomer(@Body() requestBody: {}) {
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