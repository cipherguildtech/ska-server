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
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            description: string;
            deadline: Date;
            id: string;
            status: import("@prisma/client").$Enums.Project_status;
            created_at: Date;
        }[];
    } & {
        name: string;
        phone: string;
        email: string | null;
        address: string | null;
        customer_type: import("@prisma/client").$Enums.Customer_type;
        id: string;
        created_at: Date;
        updated_at: Date;
        referal: string | null;
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
        created_at: Date;
        updated_at: Date;
        referal: string | null;
    } | undefined>;
    getCustomer(phone: string): Promise<({
        projects: {
            project_code: string;
            customer_phone: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            description: string;
            deadline: Date;
            created_user_phone: string;
            id: string;
            status: import("@prisma/client").$Enums.Project_status;
            current_stage: number;
            paid: import("@prisma/client-runtime-utils").Decimal;
            balance: import("@prisma/client-runtime-utils").Decimal;
            created_at: Date;
            updated_at: Date | null;
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
        created_at: Date;
        updated_at: Date;
        referal: string | null;
    } | undefined>;
}
