import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { CustomersService } from '../customers/customers.service';
export declare class SalesService {
    private prisma;
    private readonly projectService;
    private readonly customersService;
    constructor(prisma: PrismaService, projectService: ProjectsService, customersService: CustomersService);
    getDashboard(): Promise<{
        totalCustomer: number;
        activeProjects: number;
        pendingQuotations: number;
        approvedDeals: number;
        resentCustomers: {
            id: string;
            name: string;
            phone: string;
        }[];
        activeProjectsDetailed: {
            project_code: string;
            description: string;
            deadline: Date;
            id: string;
            status: import("@prisma/client").$Enums.Project_status;
            customer: {
                name: string;
            };
        }[];
    }>;
}
