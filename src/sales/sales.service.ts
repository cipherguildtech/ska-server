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
        const activeProjects = await this.projectService.getActiveProjectCount();
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
        const resentCustomers = await this.customersService.getRecentCustomers();
        const activeProjectsDetailed = await this.projectService.getActiveProjects();

        return { totalCustomer, activeProjects, pendingQuotations, approvedDeals, resentCustomers, activeProjectsDetailed };
    }
}
