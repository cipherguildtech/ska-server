import { Users_dept, Users_role } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator"
export class RegisterDto {
    @IsNotEmpty()
    full_name!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phone!: string

    @IsNotEmpty()
    @IsStrongPassword()
    password!: string

    @IsNotEmpty()
    role!: Users_role

    department!: Users_dept
}