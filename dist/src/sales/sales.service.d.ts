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
            name: string;
            phone: string;
            id: string;
        }[];
        activeProjectsDetailed: {
<<<<<<< HEAD
            id: string;
            project_code: string;
            description: string;
            status: import("@prisma/client").$Enums.Project_status;
            deadline: Date;
=======
>>>>>>> c47e459e11ae0e1d396eb58284a023ebf68ba7ce
            customer: {
                name: string;
            };
            description: string;
            id: string;
            project_code: string;
            status: import("@prisma/client").$Enums.Project_status;
            deadline: Date;
        }[];
    }>;
}
