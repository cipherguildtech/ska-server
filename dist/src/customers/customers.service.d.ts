import { PrismaService } from "../prisma/prisma.service";
import { customerCreationDto } from "./DTO/customerCreationDTO";
import { EventsGateway } from "../gateway/events.gateway";
export declare class CustomersService {
    private prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    getCustomerWithProjectCount(phone: string): Promise<{
        project_count: number;
        phone?: string | undefined;
        email?: string | null | undefined;
        name?: string | undefined;
        address?: string | null | undefined;
        customer_type?: import("@prisma/client").$Enums.Customer_type | undefined;
    }>;
    getCustomerProjects(phone: string): Promise<({
        projects: {
            id: string;
            created_at: Date;
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            description: string;
            status: import("@prisma/client").$Enums.Project_status;
            deadline: Date;
        }[];
    } & {
        id: string;
        phone: string;
        email: string | null;
        name: string;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        referal: string | null;
        created_at: Date;
        updated_at: Date;
    }) | null>;
    getRecentCustomers(): Promise<{
        id: string;
        phone: string;
        name: string;
    }[]>;
    getRecentCustomers1(): Promise<{
        id: string;
        phone: string;
        name: string;
    }[]>;
    getCustomersCount(): Promise<{
        count: number;
    }>;
    getCustomers(): Promise<{
        id: string;
        phone: string;
        email: string | null;
        name: string;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        referal: string | null;
    }[]>;
    createCustomer(requestBody: customerCreationDto): Promise<{
        id: string;
        phone: string;
        email: string | null;
        name: string;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        referal: string | null;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
    getCustomer(phone: string): Promise<({
        projects: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            description: string;
            status: import("@prisma/client").$Enums.Project_status;
            current_stage: number;
            paid: import("@prisma/client-runtime-utils").Decimal;
            balance: import("@prisma/client-runtime-utils").Decimal;
            deadline: Date;
            created_user_email: string;
            customer_email: string;
        }[];
    } & {
        id: string;
        phone: string;
        email: string | null;
        name: string;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        referal: string | null;
    }) | undefined>;
    updateCustomer(id: string, requestBody: any): Promise<{
        id: string;
        phone: string;
        email: string | null;
        name: string;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        referal: string | null;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
}
