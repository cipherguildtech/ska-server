import { Module } from "@nestjs/common";
import { CustomersContoller } from "./customers.controller";
import {CustomersService } from "./customers.service";
import { PrismaService } from "../prisma/prisma.service";
 
@Module (
    {
        
        controllers: [CustomersContoller],
        providers: [CustomersService , PrismaService]
    }
)

export class CustomersModule {};