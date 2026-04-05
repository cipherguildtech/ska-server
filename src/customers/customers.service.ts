import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}
    async getCustomers() {
        await this.prisma.customer.findMany
    }

    createCustomer() {

    }

    getCustomer(id: number) {

    }

    updateCustomer(id: number) {

    }
}