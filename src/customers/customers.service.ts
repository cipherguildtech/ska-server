import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { customerCreationDto } from "./DTO/customerCreationDTO";
 
@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}

    async getRecentCustomers() {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return await this.prisma.customer.findMany(
                {
                    where: {
                       created_at: {
                        lte: new Date(),
                        gte: sevenDaysAgo,
                       } 
                    },
                    orderBy: {
                        created_at: "desc"
                    },
                    select: {
                        id: true,
                        name: true,
                        phone: true
                    }
                }
            )
        }
        catch(e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async getCustomersCount() {
        try {
            const customerCount = await this.prisma.customer.count();
            return {
                "count": customerCount
            }
        }
        catch(e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }


    async getCustomers() {
       try {
        return await this.prisma.customer.findMany(
            {omit: {created_at: true, updated_at: true}}
        );
       }
       catch(e) {
        console.log(e);
        throw new InternalServerErrorException("something went wrong");
       }
    }

    async createCustomer(requestBody: customerCreationDto) {
        try {
            return await this.prisma.customer.create({data: requestBody});
        }
        catch(e) {
            if(e instanceof PrismaClientKnownRequestError) {
                if(e.code === 'P2002') {
                    throw new ConflictException("customer with these details already exists");
                }
            }
            else {
                throw new InternalServerErrorException("something went wrong");
            }
        }
    }

    async getCustomer(id: string) {
        try {
            return await this.prisma.customer.findUniqueOrThrow({
            where: {id},
            include: {projects: true},
            omit: {created_at: true, updated_at: true}
        })
        }
        catch(e) {
            if( e instanceof PrismaClientKnownRequestError) {
                if(e.code == 'P2025') {
                    throw new NotFoundException('customer not exsists')
                }
            }
           else {
            throw new InternalServerErrorException("something went wrong");
           }
        }
    }

    async updateCustomer(id: string, requestBody) {
        try {
            return await this.prisma.customer.update(
                {
                    data: requestBody,
                    where: {id}
                }
            )
        }
        catch(e) {
            if(e instanceof PrismaClientKnownRequestError) {
                if(e.code === 'P2025') {
                    throw new NotFoundException("customer not exsists");
                }
                else if (e.code === 'P2002') {
                    throw new ConflictException("customer with these details already exists");
                }
            }
            else {
                throw new InternalServerErrorException("someting went wrong");
            }
        }
    }
}