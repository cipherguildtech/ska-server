import { ProjectHistoryService } from './project_history.service';
export declare class ProjectHistoryController {
    private readonly projectHistoryService;
    constructor(projectHistoryService: ProjectHistoryService);
    getAll(): Promise<{
        id: string;
        project_id: string;
        task_old_status: import("@prisma/client").$Enums.Task_status;
        task_new_status: import("@prisma/client").$Enums.Task_status;
        detail: import("@prisma/client/runtime/client").JsonValue | null;
        note: string | null;
        changed_at: Date;
        task_id: string;
        changed_by: string;
    }[]>;
    create(data: any): Promise<{
        id: string;
        project_id: string;
        task_old_status: import("@prisma/client").$Enums.Task_status;
        task_new_status: import("@prisma/client").$Enums.Task_status;
        detail: import("@prisma/client/runtime/client").JsonValue | null;
        note: string | null;
        changed_at: Date;
        task_id: string;
        changed_by: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        project_id: string;
        task_old_status: import("@prisma/client").$Enums.Task_status;
        task_new_status: import("@prisma/client").$Enums.Task_status;
        detail: import("@prisma/client/runtime/client").JsonValue | null;
        note: string | null;
        changed_at: Date;
        task_id: string;
        changed_by: string;
    }>;
}
