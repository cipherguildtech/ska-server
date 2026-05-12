import { CustomersService } from "./customers.service";
import { customerCreationDto } from "./DTO/customerCreationDTO";
export declare class CustomersContoller {
    private readonly customersService;
    constructor(customersService: CustomersService);
    getCustomersCount(): Promise<{
        count: number;
    }>;
    getCustomerProjects(phone: string): Promise<({
        projects: {
            description: string;
            id: string;
            created_at: Date;
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
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
    getCustomerWithProjectCount(phone: string): Promise<{
        project_count: number;
        name?: string | undefined;
        phone?: string | undefined;
        email?: string | null | undefined;
        address?: string | null | undefined;
        customer_type?: import("@prisma/client").$Enums.Customer_type | undefined;
    }>;
    getRecentCustomers(): Promise<{
        name: string;
        phone: string;
        id: string;
    }[]>;
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
    getCustomer(id: string): Promise<({
        projects: {
            description: string;
            id: string;
            created_at: Date;
            updated_at: Date | null;
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            status: import("@prisma/client").$Enums.Project_status;
            current_stage: number;
            paid: import("@prisma/client-runtime-utils").Decimal;
            balance: import("@prisma/client-runtime-utils").Decimal;
            deadline: Date;
            created_user_email: string;
            customer_email: string;
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
    updateCustomer(id: string, requestBody: {}): Promise<{
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
