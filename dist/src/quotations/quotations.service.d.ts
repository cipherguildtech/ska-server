import { PrismaService } from "../prisma/prisma.service";
import { CreateQuotationDto } from "./dto/create-quotation.dto";
export declare class QuotationServices {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<({
        payments: {
            id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            created_at: Date;
            project_id: string;
            quotation_id: string | null;
            type: import("@prisma/client").$Enums.Payment_type;
            reference: string | null;
            paid_at: Date;
        }[];
        task: {
            id: string;
            created_at: Date;
            updated_at: Date;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            department: import("@prisma/client").$Enums.Users_dept;
            title: string;
            notes: string | null;
            description: string | null;
            status: import("@prisma/client").$Enums.Task_status;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            history: string | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        };
    } & {
        id: string;
        task_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
        approval_status: import("@prisma/client").$Enums.Approval_status;
        pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
        approved_at: Date | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    getAllById(id: string): Promise<({
        payments: {
            id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            created_at: Date;
            project_id: string;
            quotation_id: string | null;
            type: import("@prisma/client").$Enums.Payment_type;
            reference: string | null;
            paid_at: Date;
        }[];
        task: {
            id: string;
            created_at: Date;
            updated_at: Date;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            department: import("@prisma/client").$Enums.Users_dept;
            title: string;
            notes: string | null;
            description: string | null;
            status: import("@prisma/client").$Enums.Task_status;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            history: string | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        };
    } & {
        id: string;
        task_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
        approval_status: import("@prisma/client").$Enums.Approval_status;
        pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
        approved_at: Date | null;
        created_at: Date;
        updated_at: Date;
    }) | null>;
    uploadPdf(files: string[]): Promise<string[]>;
    createQuotation(dto: CreateQuotationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            task: {
                id: string;
                created_at: Date;
                updated_at: Date;
                project_id: string;
                assigned_to: string;
                assigned_by: string;
                department: import("@prisma/client").$Enums.Users_dept;
                title: string;
                notes: string | null;
                description: string | null;
                status: import("@prisma/client").$Enums.Task_status;
                files: import("@prisma/client/runtime/client").JsonValue | null;
                history: string | null;
                work_details: string | null;
                notes_work: string | null;
                is_quotation: boolean;
                due_at: Date;
                completed_at: Date | null;
            };
        } & {
            id: string;
            task_id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
            approval_status: import("@prisma/client").$Enums.Approval_status;
            pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
            approved_at: Date | null;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    update(id: string, body: any): Promise<{
        id: string;
        task_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
        approval_status: import("@prisma/client").$Enums.Approval_status;
        pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
        approved_at: Date | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getAllByProjectStatus(id: string, status: string): Promise<"Invalid status" | ({
        payments: {
            id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            created_at: Date;
            project_id: string;
            quotation_id: string | null;
            type: import("@prisma/client").$Enums.Payment_type;
            reference: string | null;
            paid_at: Date;
        }[];
        task: {
            id: string;
            created_at: Date;
            updated_at: Date;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            department: import("@prisma/client").$Enums.Users_dept;
            title: string;
            notes: string | null;
            description: string | null;
            status: import("@prisma/client").$Enums.Task_status;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            history: string | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        };
    } & {
        id: string;
        task_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
        approval_status: import("@prisma/client").$Enums.Approval_status;
        pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
        approved_at: Date | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        task_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
        approval_status: import("@prisma/client").$Enums.Approval_status;
        pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
        approved_at: Date | null;
        created_at: Date;
        updated_at: Date;
    } | "Invalid status">;
    getAllByStatus(status: string): Promise<"Invalid status" | ({
        payments: {
            id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            created_at: Date;
            project_id: string;
            quotation_id: string | null;
            type: import("@prisma/client").$Enums.Payment_type;
            reference: string | null;
            paid_at: Date;
        }[];
        task: {
            id: string;
            created_at: Date;
            updated_at: Date;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            department: import("@prisma/client").$Enums.Users_dept;
            title: string;
            notes: string | null;
            description: string | null;
            status: import("@prisma/client").$Enums.Task_status;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            history: string | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        };
    } & {
        id: string;
        task_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
        approval_status: import("@prisma/client").$Enums.Approval_status;
        pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
        approved_at: Date | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    getAllBycode(code: string): Promise<({
        task: {
            project_id: string;
            title: string;
        };
    } & {
        id: string;
        task_id: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
        approval_status: import("@prisma/client").$Enums.Approval_status;
        pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
        approved_at: Date | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
}
