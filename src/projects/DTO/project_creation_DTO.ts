import { Customer, Service_type, Users } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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

    @IsNotEmpty()
    @IsEmail()
    created_user_email!: string
}