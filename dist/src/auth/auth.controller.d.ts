import { AuthService } from './auth.service';
import { LoginDto } from './DTO/loginDto';
import { RegisterDto } from './DTO/registerDto';
import { VerifyOtpDto } from './DTO/verifyOtpDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    logIn(requestBody: LoginDto): Promise<{
        message: string;
        user: {
            name: string;
            role: import("@prisma/client").$Enums.Users_role;
            phone: string;
            department: import("@prisma/client").$Enums.Users_dept | null;
        };
    }>;
    register(requestBody: RegisterDto): Promise<{
        phone: string;
        id: string;
        email: string | null;
        created_at: Date;
        updated_at: Date;
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        role: import("@prisma/client").$Enums.Users_role;
        is_active: boolean;
    } | undefined>;
    resetPassword(requestBody: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    sendOtp(requestBody: {
        email: string;
    }): Promise<void>;
    verifyOtp(requestBody: VerifyOtpDto): Promise<{
        message: string;
    } | undefined>;
}
