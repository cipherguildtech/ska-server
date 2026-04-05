import { Controller , Get, Post, Param, Put} from "@nestjs/common";
import {CustomersService} from "./customers.service";

@Controller('customers')
export class CustomersContoller {
    constructor( private readonly customersService: CustomersService) { }

    @Get()
    getCustomers(){
        return this.customersService.getCustomers();
    }

    @Post()
    createCustomer() {
        return this.customersService.createCustomer();
    }

    @Get(':id')
    getCustomer(@Param() param: number) {
        return this.customersService.getCustomer(param);
    }

    @Put(':id')
    updateCustomer(@Param() param: number){
        return this.customersService.updateCustomer(param);
    }

}