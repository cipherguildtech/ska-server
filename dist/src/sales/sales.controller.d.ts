import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
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
