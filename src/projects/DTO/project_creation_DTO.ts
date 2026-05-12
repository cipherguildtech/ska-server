import { Customer, Service_type, Users } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class projectCreationDTO{
    @IsNotEmpty()
    @IsString()
    project_code!: string

    @IsNotEmpty()
    @IsPhoneNumber('IN')
    customer_phone!: string

    @IsNotEmpty()
    @IsString()
    service_type!: Service_type

    @IsNotEmpty()
    @IsString()
    description!: string

    @IsNotEmpty()
    deadline!: Date

    @IsNotEmpty()
    @IsPhoneNumber('IN')
    created_user_phone!: string
}