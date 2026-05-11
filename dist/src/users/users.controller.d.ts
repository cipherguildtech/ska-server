import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserTasksDetail(phone: string): Promise<{
        user: {
            full_name: string;
            role: import("@prisma/client").$Enums.Users_role;
            department: import("@prisma/client").$Enums.Users_dept | null;
            assigned_tasks: {
                id: string;
                created_at: Date;
                updated_at: Date;
                assigned_by: string;
                title: string;
                notes: string | null;
                description: string | null;
                status: import("@prisma/client").$Enums.Task_status;
                files: import("@prisma/client/runtime/client").JsonValue;
                work_details: string | null;
                notes_work: string | null;
                is_quotation: boolean;
                due_at: Date;
                completed_at: Date | null;
                taskHistory: {
                    project_id: string;
                    changed_by: string;
                    task_old_status: import("@prisma/client").$Enums.Task_status;
                    task_new_status: import("@prisma/client").$Enums.Task_status;
                    detail: import("@prisma/client/runtime/client").JsonValue;
                    note: string | null;
                    changed_at: Date;
                }[];
                quotations: {
                    created_at: Date;
                    updated_at: Date;
                    payments: {
                        created_at: Date;
                        amount: import("@prisma/client-runtime-utils").Decimal;
                        type: import("@prisma/client").$Enums.Payment_type;
                        reference: string | null;
                        paid_at: Date;
                    }[];
                    amount: import("@prisma/client-runtime-utils").Decimal;
                    advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
                    approval_status: import("@prisma/client").$Enums.Approval_status;
                    pdf_url: import("@prisma/client/runtime/client").JsonValue;
                    approved_at: Date | null;
                }[];
                project: {
                    id: string;
                    created_at: Date;
                    updated_at: Date | null;
                    description: string;
                    status: import("@prisma/client").$Enums.Project_status;
                    project_code: string;
                    service_type: import("@prisma/client").$Enums.Service_type;
                    current_stage: number;
                    paid: import("@prisma/client-runtime-utils").Decimal;
                    balance: import("@prisma/client-runtime-utils").Decimal;
                    deadline: Date;
                    created_user_email: string;
                    customer_email: string;
                    created_by: {
                        id: string;
                        full_name: string;
                        phone: string;
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
    getUsersBasicDetails(): Promise<{
        full_name: string;
        email: string | null;
        phone: string;
        role: import("@prisma/client").$Enums.Users_role;
        department: import("@prisma/client").$Enums.Users_dept | null;
        is_active: boolean;
    }[]>;
    activateOrDeactivate(phone: string, action: boolean): Promise<void>;
    getUsers(): Promise<({
        history_logs: {
            id: string;
            project_id: string;
            task_id: string;
            changed_by: string;
            task_old_status: import("@prisma/client").$Enums.Task_status;
            task_new_status: import("@prisma/client").$Enums.Task_status;
            detail: import("@prisma/client/runtime/client").JsonValue | null;
            note: string | null;
            changed_at: Date;
        }[];
        created_tasks: {
            id: string;
            department: import("@prisma/client").$Enums.Users_dept;
            created_at: Date;
            updated_at: Date;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
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
        }[];
        assigned_tasks: {
            id: string;
            department: import("@prisma/client").$Enums.Users_dept;
            created_at: Date;
            updated_at: Date;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
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
        }[];
    } & {
        full_name: string;
        email: string | null;
        phone: string;
        role: import("@prisma/client").$Enums.Users_role;
        department: import("@prisma/client").$Enums.Users_dept | null;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    })[]>;
    getUser(phone: string): Promise<({
        history_logs: {
            id: string;
            project_id: string;
            task_id: string;
            changed_by: string;
            task_old_status: import("@prisma/client").$Enums.Task_status;
            task_new_status: import("@prisma/client").$Enums.Task_status;
            detail: import("@prisma/client/runtime/client").JsonValue | null;
            note: string | null;
            changed_at: Date;
        }[];
        created_tasks: {
            id: string;
            department: import("@prisma/client").$Enums.Users_dept;
            created_at: Date;
            updated_at: Date;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
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
        }[];
        assigned_tasks: {
            id: string;
            department: import("@prisma/client").$Enums.Users_dept;
            created_at: Date;
            updated_at: Date;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
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
        }[];
    } & {
        full_name: string;
        email: string | null;
        phone: string;
        role: import("@prisma/client").$Enums.Users_role;
        department: import("@prisma/client").$Enums.Users_dept | null;
        is_active: boolean;
        updated_at: Date;
    }) | undefined>;
    updateUser(phone: string, requestBody: {
        name: string;
        email: string;
    }): Promise<{
        id: string;
        full_name: string;
        email: string | null;
        phone: string;
        password_hash: string;
        otp: string | null;
        otp_expiry: Date | null;
        role: import("@prisma/client").$Enums.Users_role;
        department: import("@prisma/client").$Enums.Users_dept | null;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
    getUserTasks(): Promise<{
        id: string;
        full_name: string;
        phone: string;
        role: import("@prisma/client").$Enums.Users_role;
        department: import("@prisma/client").$Enums.Users_dept | null;
        _count: {
            assigned_tasks: number;
        };
    }[]>;
    getUserTaskTypeCount(phone: string): Promise<{
        total_task_count: number;
        pending_task_count: number;
        in_progress_task_count: number;
        completed_task_count: number;
        incomplete_task_count: number;
        delayed_task_count: number;
    }>;
    getUserCompletedTasks(phone: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.Task_status;
        due_at: Date;
        completed_at: Date | null;
        project: {
            project_code: string;
        };
    }[]>;
    getUserInCompleteTasks(phone: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.Task_status;
        due_at: Date;
        project: {
            project_code: string;
        };
    }[]>;
    getUserActiveTasks(phone: string): Promise<{
        id: string;
        title: string;
        status: import("@prisma/client").$Enums.Task_status;
        due_at: Date;
        project: {
            project_code: string;
        };
    }[]>;
}
