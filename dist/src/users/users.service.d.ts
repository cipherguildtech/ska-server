import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserTaskTypeCounts(phone: string): Promise<{
        total_task_count: number;
        pending_task_count: number;
        in_progress_task_count: number;
        completed_task_count: number;
        incomplete_task_count: number;
        delayed_task_count: number;
    }>;
    getUsersBasicDetails(): Promise<{
        phone: string;
        email: string | null;
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        role: import("@prisma/client").$Enums.Users_role;
        is_active: boolean;
    }[]>;
    getUserTasksDetail(phone: string): Promise<{
        user: {
            department: import("@prisma/client").$Enums.Users_dept | null;
            full_name: string;
            role: import("@prisma/client").$Enums.Users_role;
            assigned_tasks: {
                quotations: {
                    payments: {
                        created_at: Date;
                        amount: import("@prisma/client-runtime-utils").Decimal;
                        type: import("@prisma/client").$Enums.Payment_type;
                        reference: string | null;
                        paid_at: Date;
                    }[];
                    created_at: Date;
                    updated_at: Date;
                    amount: import("@prisma/client-runtime-utils").Decimal;
                    advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
                    approval_status: import("@prisma/client").$Enums.Approval_status;
                    pdf_url: import("@prisma/client/runtime/client").JsonValue;
                    approved_at: Date | null;
                }[];
                description: string | null;
                id: string;
                created_at: Date;
                updated_at: Date;
                status: import("@prisma/client").$Enums.Task_status;
                assigned_by: string;
                title: string;
                notes: string | null;
                files: import("@prisma/client/runtime/client").JsonValue;
                work_details: string | null;
                notes_work: string | null;
                is_quotation: boolean;
                due_at: Date;
                completed_at: Date | null;
                taskHistory: {
                    project_id: string;
                    task_old_status: import("@prisma/client").$Enums.Task_status;
                    task_new_status: import("@prisma/client").$Enums.Task_status;
                    detail: import("@prisma/client/runtime/client").JsonValue;
                    note: string | null;
                    changed_at: Date;
                    changed_by: string;
                }[];
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
                    created_by: {
                        phone: string;
                        id: string;
                        full_name: string;
                    };
                };
            }[];
        } | null;
        completed_tasks_count: number;
        cancelled_tasks_count: number;
        pending_tasks_count: number;
        inprogress_tasks_count: number;
        review_tasks_count: number;
    }>;
    getUsers(): Promise<({
        history_logs: {
            id: string;
            project_id: string;
            task_old_status: import("@prisma/client").$Enums.Task_status;
            task_new_status: import("@prisma/client").$Enums.Task_status;
            detail: import("@prisma/client/runtime/client").JsonValue | null;
            note: string | null;
            changed_at: Date;
            task_id: string;
            changed_by: string;
        }[];
        created_tasks: {
            description: string | null;
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("@prisma/client").$Enums.Task_status;
            history: string | null;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            department: import("@prisma/client").$Enums.Users_dept;
            title: string;
            notes: string | null;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        }[];
        assigned_tasks: {
            description: string | null;
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("@prisma/client").$Enums.Task_status;
            history: string | null;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            department: import("@prisma/client").$Enums.Users_dept;
            title: string;
            notes: string | null;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        }[];
    } & {
        phone: string;
        email: string | null;
        created_at: Date;
        updated_at: Date;
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        role: import("@prisma/client").$Enums.Users_role;
        is_active: boolean;
    })[]>;
    getUserTasks(): Promise<{
        phone: string;
        id: string;
        _count: {
            assigned_tasks: number;
        };
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        role: import("@prisma/client").$Enums.Users_role;
    }[]>;
    getUser(phone: string): Promise<({
        history_logs: {
            id: string;
            project_id: string;
            task_old_status: import("@prisma/client").$Enums.Task_status;
            task_new_status: import("@prisma/client").$Enums.Task_status;
            detail: import("@prisma/client/runtime/client").JsonValue | null;
            note: string | null;
            changed_at: Date;
            task_id: string;
            changed_by: string;
        }[];
        created_tasks: {
            description: string | null;
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("@prisma/client").$Enums.Task_status;
            history: string | null;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            department: import("@prisma/client").$Enums.Users_dept;
            title: string;
            notes: string | null;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        }[];
        assigned_tasks: {
            description: string | null;
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("@prisma/client").$Enums.Task_status;
            history: string | null;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            department: import("@prisma/client").$Enums.Users_dept;
            title: string;
            notes: string | null;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        }[];
    } & {
        phone: string;
        email: string | null;
        updated_at: Date;
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        role: import("@prisma/client").$Enums.Users_role;
        is_active: boolean;
    }) | undefined>;
    updateUser(phone: string, { name, email }: {
        name: string;
        email: string;
    }): Promise<{
        phone: string;
        email: string | null;
        id: string;
        created_at: Date;
        updated_at: Date;
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        password_hash: string;
        otp: string | null;
        otp_expiry: Date | null;
        role: import("@prisma/client").$Enums.Users_role;
        is_active: boolean;
    } | undefined>;
    getUserCompletedTasks(phone: string): Promise<{
        description: string | null;
        id: string;
        status: import("@prisma/client").$Enums.Task_status;
        title: string;
        due_at: Date;
        completed_at: Date | null;
        project: {
            project_code: string;
        };
    }[]>;
    getUserIncompleteTasks(phone: string): Promise<{
        description: string | null;
        id: string;
        status: import("@prisma/client").$Enums.Task_status;
        title: string;
        due_at: Date;
        project: {
            project_code: string;
        };
    }[]>;
    getUserActiveTasks(phone: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.Task_status;
        title: string;
        due_at: Date;
        project: {
            project_code: string;
        };
    }[]>;
}
