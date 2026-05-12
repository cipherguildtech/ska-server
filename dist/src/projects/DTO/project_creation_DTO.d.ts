import { Service_type } from "@prisma/client";
export declare class projectCreationDTO {
    project_code: string;
    customer_phone: string;
    service_type: Service_type;
    description: string;
    deadline: Date;
    created_user_phone: string;
}
