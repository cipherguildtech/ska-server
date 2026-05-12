import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { customerCreationDto } from "./DTO/customerCreationDTO";
import { EventsGateway } from "../gateway/events.gateway";

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService, private readonly eventsGateway: EventsGateway) { }

    async getCustomerWithProjectCount(phone: string) {
        try {
            const customer = await this.prisma.customer.findUnique(
                {
                    where: {
                        phone: phone
                    },
                    select: {
                        name: true,
                        phone: true,
                        address: true,
                        email: true,
                        customer_type: true,
                        }
                    },
            );

            const project_count = await this.prisma.projects.count(
                {
                    where: {
                        customer: {
                            phone: phone
                        }
                        
                    }
                }
            );
            return {
                ...customer,
               'project_count': project_count
            };
        }
        catch(e) {
            throw new InternalServerErrorException('something went wrong');
        }
    }

    async getCustomerProjects(phone: string) {
        try {
            const customerProjects = await this.prisma.customer.findUnique(
                {
                    where: {
                        phone
                    },
                    include: {
                        projects: {
                            select: {
                                status: true,
                                created_at: true,
                                description: true,
                                project_code: true,
                                service_type: true,
                                deadline: true,
                                id: true
                            }
                        }
                    },
                }
            );
            return customerProjects;
        }
        catch(e) {
            throw new InternalServerErrorException('something went wrong');
        }
    }

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
        catch (e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }
    async getRecentCustomers1() {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const customers = await this.prisma.customer.findMany(
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
            );
            return customers.slice(-5);
        }
        catch (e) {
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
        catch (e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }


    async getCustomers() {
        try {
            return await this.prisma.customer.findMany(
                { omit: { created_at: true, updated_at: true } }
            );
        }
        catch (e) {
            console.log(e);
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async createCustomer(requestBody: customerCreationDto) {
        try {
            const customer = await this.prisma.customer.create({ data: requestBody });
            this.eventsGateway.emit("customer:created");
            return customer;
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new ConflictException("customer with these details already exists");
                }
            }
            else {
                throw new InternalServerErrorException("something went wrong");
            }
        }
    }

    async getCustomer(phone: string) {
        try {
            return await this.prisma.customer.findUniqueOrThrow({
                where: { phone },
                include: { projects: true },
                omit: { created_at: true, updated_at: true }
            })
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
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
            const customer = await this.prisma.customer.update(
                {
                    data: requestBody,
                    where: { id }
                }
            )
            this.eventsGateway.emit("customer:updated");
            return customer;
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
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