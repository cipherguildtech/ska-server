import { Customer_type } from "@prisma/client";
export declare class customerCreationDto {
    name: string;
    phone: string;
    email: string | null;
    address: string;
    customer_type: Customer_type;
    referal: string | null;
}
