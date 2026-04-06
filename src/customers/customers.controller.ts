import { Controller , Get, Post, Param, Put, Body} from "@nestjs/common";
import {CustomersService} from "./customers.service";

@Controller('customers')
export class CustomersContoller {
    constructor( private readonly customersService: CustomersService) { }

    @Get()
    getCustomers(){
        return this.customersService.getCustomers();
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
    updateCustomer(@Param() param: number){
        return this.customersService.updateCustomer(param);
    }

}