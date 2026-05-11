import { PrismaService } from "../prisma/prisma.service";
import { EventsGateway } from "../gateway/events.gateway";
import { CreatePaymentDto } from "./dto/create-payment.dto";
export declare class PaymentServices {
    private prisma;
    private readonly eventsGateWay;
    constructor(prisma: PrismaService, eventsGateWay: EventsGateway);
    getAll(): Promise<({
        project: {
            description: string;
            id: string;
            created_at: Date;
            updated_at: Date | null;
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            status: import("@prisma/client").$Enums.Project_status;
            current_stage: number;
            paid: import("@prisma/client-runtime-utils").Decimal;
            balance: import("@prisma/client-runtime-utils").Decimal;
            deadline: Date;
            created_user_email: string;
            customer_email: string;
        };
        quotation: {
            id: string;
            created_at: Date;
            updated_at: Date;
            task_id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
            approval_status: import("@prisma/client").$Enums.Approval_status;
            pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
            approved_at: Date | null;
        } | null;
    } & {
        id: string;
        created_at: Date;
        project_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        quotation_id: string | null;
        type: import("@prisma/client").$Enums.Payment_type;
        reference: string | null;
        paid_at: Date;
    })[]>;
    createPayment(dto: CreatePaymentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            project: {
                description: string;
                id: string;
                created_at: Date;
                updated_at: Date | null;
                project_code: string;
                service_type: import("@prisma/client").$Enums.Service_type;
                status: import("@prisma/client").$Enums.Project_status;
                current_stage: number;
                paid: import("@prisma/client-runtime-utils").Decimal;
                balance: import("@prisma/client-runtime-utils").Decimal;
                deadline: Date;
                created_user_email: string;
                customer_email: string;
            };
            quotation: {
                id: string;
                created_at: Date;
                updated_at: Date;
                task_id: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
                approval_status: import("@prisma/client").$Enums.Approval_status;
                pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
                approved_at: Date | null;
            } | null;
        } & {
            id: string;
            created_at: Date;
            project_id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            quotation_id: string | null;
            type: import("@prisma/client").$Enums.Payment_type;
            reference: string | null;
            paid_at: Date;
        };
    }>;
    getAllByProject(id: string): Promise<({
        project: {
            description: string;
            id: string;
            created_at: Date;
            updated_at: Date | null;
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            status: import("@prisma/client").$Enums.Project_status;
            current_stage: number;
            paid: import("@prisma/client-runtime-utils").Decimal;
            balance: import("@prisma/client-runtime-utils").Decimal;
            deadline: Date;
            created_user_email: string;
            customer_email: string;
        };
        quotation: {
            id: string;
            created_at: Date;
            updated_at: Date;
            task_id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
            approval_status: import("@prisma/client").$Enums.Approval_status;
            pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
            approved_at: Date | null;
        } | null;
    } & {
        id: string;
        created_at: Date;
        project_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        quotation_id: string | null;
        type: import("@prisma/client").$Enums.Payment_type;
        reference: string | null;
        paid_at: Date;
    })[]>;
}
