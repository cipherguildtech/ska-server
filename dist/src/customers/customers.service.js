"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client/runtime/client");
const events_gateway_1 = require("../gateway/events.gateway");
let CustomersService = class CustomersService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async getCustomerWithProjectCount(phone) {
        try {
            const customer = await this.prisma.customer.findUnique({
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
            });
            const project_count = await this.prisma.projects.count({
                where: {
                    customer: {
                        phone: phone
                    }
                }
            });
            return {
                ...customer,
                'project_count': project_count
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async getCustomerProjects(phone) {
        try {
            const customerProjects = await this.prisma.customer.findUnique({
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
            });
            return customerProjects;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async getRecentCustomers() {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return await this.prisma.customer.findMany({
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
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("something went wrong");
        }
    }
    async getRecentCustomers1() {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const customers = await this.prisma.customer.findMany({
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
            });
            return customers.slice(-5);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("something went wrong");
        }
    }
    async getCustomersCount() {
        try {
            const customerCount = await this.prisma.customer.count();
            return {
                "count": customerCount
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("something went wrong");
        }
    }
    async getCustomers() {
        try {
            return await this.prisma.customer.findMany({ omit: { created_at: true, updated_at: true } });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException("something went wrong");
        }
    }
    async createCustomer(requestBody) {
        try {
            const customer = await this.prisma.customer.create({ data: requestBody });
            this.eventsGateway.emit("customer:created");
            return customer;
        }
        catch (e) {
            if (e instanceof client_1.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new common_1.ConflictException("customer with these details already exists");
                }
            }
            else {
                throw new common_1.InternalServerErrorException("something went wrong");
            }
        }
    }
    async getCustomer(id) {
        try {
            return await this.prisma.customer.findUniqueOrThrow({
                where: { id },
                include: { projects: true },
                omit: { created_at: true, updated_at: true }
            });
        }
        catch (e) {
            if (e instanceof client_1.PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new common_1.NotFoundException('customer not exsists');
                }
            }
            else {
                throw new common_1.InternalServerErrorException("something went wrong");
            }
        }
    }
    async updateCustomer(id, requestBody) {
        try {
            const customer = await this.prisma.customer.update({
                data: requestBody,
                where: { id }
            });
            this.eventsGateway.emit("customer:updated");
            return customer;
        }
        catch (e) {
            if (e instanceof client_1.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new common_1.NotFoundException("customer not exsists");
                }
                else if (e.code === 'P2002') {
                    throw new common_1.ConflictException("customer with these details already exists");
                }
            }
            else {
                throw new common_1.InternalServerErrorException("someting went wrong");
            }
        }
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, events_gateway_1.EventsGateway])
], CustomersService);
//# sourceMappingURL=customers.service.js.map