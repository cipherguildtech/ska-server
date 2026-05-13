import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './DTO/loginDto';
import { RegisterDto } from './DTO/registerDto';
import { VerifyOtpDto } from './DTO/verifyOtpDto';
import { EventsGateway } from '../gateway/events.gateway';
export declare class AuthService {
    private readonly prisma;
    private readonly eventsGateway;
    private readonly emailTransporter;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    logIn({ phone, password }: LoginDto): Promise<{
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
    resetPassword({ email, password }: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    sendOTP(email: string): Promise<void>;
    verifyOTP({ otp, email }: VerifyOtpDto): Promise<{
        message: string;
    } | undefined>;
}
