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
    }>;
    getUserFullDetail(phone: string): Promise<{
        phone: string;
        email: string | null;
        id: string;
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
        title: string;
        due_at: Date;
        completed_at: Date | null;
        project: {
            project_code: string;
        };
    }[]>;
    getUserInCompleteTasks(phone: string): Promise<{
        id: string;
        description: string | null;
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
