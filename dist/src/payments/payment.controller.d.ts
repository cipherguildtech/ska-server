import { PaymentServices } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentServices);
    getAll(): Promise<({
        project: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            description: string;
            status: import("@prisma/client").$Enums.Project_status;
            current_stage: number;
            paid: import("@prisma/client-runtime-utils").Decimal;
            balance: import("@prisma/client-runtime-utils").Decimal;
            deadline: Date;
            created_user_phone: string;
            customer_phone: string;
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
    create(dto: CreatePaymentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            project: {
                id: string;
                created_at: Date;
                updated_at: Date | null;
                project_code: string;
                service_type: import("@prisma/client").$Enums.Service_type;
                description: string;
                status: import("@prisma/client").$Enums.Project_status;
                current_stage: number;
                paid: import("@prisma/client-runtime-utils").Decimal;
                balance: import("@prisma/client-runtime-utils").Decimal;
                deadline: Date;
                created_user_phone: string;
                customer_phone: string;
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
            id: string;
            created_at: Date;
            updated_at: Date | null;
            project_code: string;
            service_type: import("@prisma/client").$Enums.Service_type;
            description: string;
            status: import("@prisma/client").$Enums.Project_status;
            current_stage: number;
            paid: import("@prisma/client-runtime-utils").Decimal;
            balance: import("@prisma/client-runtime-utils").Decimal;
            deadline: Date;
            created_user_phone: string;
            customer_phone: string;
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
