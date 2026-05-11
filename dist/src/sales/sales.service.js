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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const projects_service_1 = require("../projects/projects.service");
const customers_service_1 = require("../customers/customers.service");
let SalesService = class SalesService {
    prisma;
    projectService;
    customersService;
    constructor(prisma, projectService, customersService) {
        this.prisma = prisma;
        this.projectService = projectService;
        this.customersService = customersService;
    }
    async getDashboard() {
        const totalCustomer = await this.prisma.customer.count();
        const activeProjects = await this.prisma.projects.count({
            where: {
                status: {
                    notIn: ['CANCELLED', 'COMPLETED']
                }
            }
        });
        const pendingQuotations = await this.prisma.quotations.count({
            where: {
                approval_status: {
                    in: ['DRAFT', 'SENT']
                }
            }
        });
        const approvedDeals = await this.prisma.quotations.count({
            where: {
                approval_status: 'APPROVED'
            }
        });
        const resentCustomers = await this.customersService.getRecentCustomers1();
        const activeProjectsDetailed = await this.prisma.projects.findMany({
            take: 5,
            orderBy: {
                created_at: 'asc'
            },
            select: {
                id: true,
                project_code: true,
                customer: {
                    select: {
                        name: true
                    }
                },
                description: true,
                deadline: true,
                status: true,
            },
            where: {
                status: {
                    notIn: ['CANCELLED', 'COMPLETED']
                }
            }
        });
        return { totalCustomer, activeProjects, pendingQuotations, approvedDeals, resentCustomers, activeProjectsDetailed };
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, projects_service_1.ProjectsService, customers_service_1.CustomersService])
], SalesService);
//# sourceMappingURL=sales.service.js.map