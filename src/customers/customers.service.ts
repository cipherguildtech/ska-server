import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
 
@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}
    async getCustomers() {
        return "";
        // await this.prisma.customer.findMany
    }

    async createCustomer(requestBody) {
        return await this.prisma.customer.create({data: requestBody});
    }

    async getCustomer(id: string) {
        try {
            return await this.prisma.customer.findUniqueOrThrow({
            where: {id}
        })
        }
        catch(e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }

    updateCustomer(id: number) {
return "";
    }
}