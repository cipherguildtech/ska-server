import { Module } from "@nestjs/common";
import { CustomersContoller } from "./customers.controller";
import {CustomersService } from "./customers.service"; 

@Module (
    {
        controllers: [CustomersContoller],
        providers: [CustomersService],
         exports: [CustomersService],
    }
)

export class CustomersModule {};