import { UsersService } from './users.service';
import { Users_dept, Users_role } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateUserDetails(phone: string, requestBody: {
        name: string | null;
        email: string | null;
        password: string | null;
        role: Users_role | null;
        department: Users_dept | null;
    }): Promise<{
        id: string;
        phone: string;
        email: string | null;
        created_at: Date;
        updated_at: Date;
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        password_hash: string;
        otp: string | null;
        otp_expiry: Date | null;
        role: import("@prisma/client").$Enums.Users_role;
        is_active: boolean;
    }>;
    getUserFullDetail(phone: string): Promise<{
        id: string;
        phone: string;
        email: string | null;
        created_at: Date;
        updated_at: Date;
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        password_hash: string;
        role: import("@prisma/client").$Enums.Users_role;
        is_active: boolean;
    } | null>;
    getUserTasksDetail(phone: string): Promise<{
        user: {
            department: import("@prisma/client").$Enums.Users_dept | null;
            full_name: string;
            role: import("@prisma/client").$Enums.Users_role;
            assigned_tasks: {
                id: string;
                created_at: Date;
                updated_at: Date;
                description: string | null;
                status: import("@prisma/client").$Enums.Task_status;
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
                    created_user_email: string;
                    customer_email: string;
                    created_by: {
                        id: string;
                        phone: string;
                        full_name: string;
                    };
                };
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
                    task_old_status: import("@prisma/client").$Enums.Task_status;
                    task_new_status: import("@prisma/client").$Enums.Task_status;
                    detail: import("@prisma/client/runtime/client").JsonValue;
                    note: string | null;
                    changed_at: Date;
                    project_id: string;
                    changed_by: string;
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
            }[];
        } | null;
        completed_tasks_count: number;
        cancelled_tasks_count: number;
        pending_tasks_count: number;
        inprogress_tasks_count: number;
        review_tasks_count: number;
    }>;
    getUsersBasicDetails(): Promise<{
        phone: string;
        email: string | null;
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        role: import("@prisma/client").$Enums.Users_role;
        is_active: boolean;
    }[]>;
    activateOrDeactivate(phone: string, action: boolean): Promise<void>;
    getUsers(): Promise<({
        history_logs: {
            id: string;
            task_old_status: import("@prisma/client").$Enums.Task_status;
            task_new_status: import("@prisma/client").$Enums.Task_status;
            detail: import("@prisma/client/runtime/client").JsonValue | null;
            note: string | null;
            changed_at: Date;
            task_id: string;
            project_id: string;
            changed_by: string;
        }[];
        created_tasks: {
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
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
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
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
    getUser(phone: string): Promise<({
        history_logs: {
            id: string;
            task_old_status: import("@prisma/client").$Enums.Task_status;
            task_new_status: import("@prisma/client").$Enums.Task_status;
            detail: import("@prisma/client/runtime/client").JsonValue | null;
            note: string | null;
            changed_at: Date;
            task_id: string;
            project_id: string;
            changed_by: string;
        }[];
        created_tasks: {
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
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
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
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
    updateUser(phone: string, requestBody: {
        name: string;
        email: string;
    }): Promise<{
        id: string;
        phone: string;
        email: string | null;
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
    getUserTasks(): Promise<{
        id: string;
        phone: string;
        _count: {
            assigned_tasks: number;
        };
        department: import("@prisma/client").$Enums.Users_dept | null;
        full_name: string;
        role: import("@prisma/client").$Enums.Users_role;
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
        description: string | null;
        status: import("@prisma/client").$Enums.Task_status;
        project: {
            project_code: string;
        };
        title: string;
        due_at: Date;
        completed_at: Date | null;
    }[]>;
    getUserInCompleteTasks(phone: string): Promise<{
        id: string;
        description: string | null;
        status: import("@prisma/client").$Enums.Task_status;
        project: {
            project_code: string;
        };
        title: string;
        due_at: Date;
    }[]>;
    getUserActiveTasks(phone: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.Task_status;
        project: {
            project_code: string;
        };
        title: string;
        due_at: Date;
    }[]>;
}
