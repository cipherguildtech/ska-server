import { IsNotEmpty,IsEmail, IsPhoneNumber, } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phone!: string;

    @IsNotEmpty()
    password!: string;

}