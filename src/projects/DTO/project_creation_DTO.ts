import { Service_type } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class projectCreationDTO{
    @IsNotEmpty()
    @IsString()
    project_code!: string

    @IsNotEmpty()
    @IsString()
    customer_id!: string

    @IsNotEmpty()
    @IsString()
    service_type!: Service_type

    @IsNotEmpty()
    @IsString()
    description!: string

    @IsNotEmpty()
    deadline!: Date
}