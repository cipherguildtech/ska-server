import { Injectable } from "@nestjs/common";
 import { PrismaService } from "../prisma/prisma.service";
 
@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}
    async getCustomers() {
        return "";
        // await this.prisma.customer.findMany
    }

    createCustomer() {
return "";
    }

    getCustomer(id: number) {
return "";
    }

    updateCustomer(id: number) {
return "";
    }
}