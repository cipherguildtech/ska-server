import { PrismaService } from "../prisma/prisma.service";
import { customerCreationDto } from "./DTO/customerCreationDTO";
import { EventsGateway } from "../gateway/events.gateway";
export declare class CustomersService {
    private prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    getCustomerWithProjectCount(phone: string): Promise<{
        project_count: number;
        name?: string | undefined;
        phone?: string | undefined;
        email?: string | null | undefined;
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
        name: string;
        phone: string;
        email: string | null;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        id: string;
        referal: string | null;
        created_at: Date;
        updated_at: Date;
    }) | null>;
    getRecentCustomers(): Promise<{
        name: string;
        phone: string;
        id: string;
    }[]>;
    getRecentCustomers1(): Promise<{
        name: string;
        phone: string;
        id: string;
    }[]>;
    getCustomersCount(): Promise<{
        count: number;
    }>;
    getCustomers(): Promise<{
        name: string;
        phone: string;
        email: string | null;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        id: string;
        referal: string | null;
    }[]>;
    createCustomer(requestBody: customerCreationDto): Promise<{
        name: string;
        phone: string;
        email: string | null;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        id: string;
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
            created_user_phone: string;
            customer_phone: string;
        }[];
    } & {
        name: string;
        phone: string;
        email: string | null;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        id: string;
        referal: string | null;
    }) | undefined>;
    updateCustomer(id: string, requestBody: any): Promise<{
        name: string;
        phone: string;
        email: string | null;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        id: string;
        referal: string | null;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
}
