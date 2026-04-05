import { Module } from "@nestjs/common";
import { CustomersContoller } from "./customers.controller";
import {CustomersService } from "./customers.service";

@Module (
    {
        imports: [],
        controllers: [CustomersContoller],
        providers: [CustomersService]
    }
)

export class CustomersModule {};