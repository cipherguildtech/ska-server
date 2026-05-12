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
    updateCustomer(id: string, requestBody: {}): Promise<{
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
