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
            customer: {
                name: string;
            };
            id: string;
            project_code: string;
            description: string;
            status: import("@prisma/client").$Enums.Project_status;
            deadline: Date;
        }[];
    }>;
}
