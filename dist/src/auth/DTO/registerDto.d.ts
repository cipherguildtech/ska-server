import { Users_dept, Users_role } from "@prisma/client";
export declare class RegisterDto {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: Users_role;
    department: Users_dept;
}
