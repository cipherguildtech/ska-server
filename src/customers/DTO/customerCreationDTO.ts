import { Customer_type } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class customerCreationDto {
    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phone!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsString()
    address!: string

    @IsNotEmpty()
    customer_type!: Customer_type

    referal!: string

}
