import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class SalesService {

    constructor(private prisma: PrismaService, private readonly projectService: ProjectsService, private readonly customersService: CustomersService) {
    }
    async getDashboard() {
        const totalCustomer = await this.prisma.customer.count();
        const activeProjects = await this.prisma.projects.count(
            {
                where: {
                    status: {
                        notIn: ['CANCELLED', 'COMPLETED']
                    }
                }
            }
        );

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
        const activeProjectsDetailed = await this.prisma.projects.findMany(
            {
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
            }
        );

        return { totalCustomer, activeProjects, pendingQuotations, approvedDeals, resentCustomers, activeProjectsDetailed };
    }
}
