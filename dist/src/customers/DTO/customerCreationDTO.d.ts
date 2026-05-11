import { Customer_type } from "@prisma/client";
export declare class customerCreationDto {
    name: string;
    phone: string;
    email: string;
    address: string;
    customer_type: Customer_type;
    referal: string;
}
