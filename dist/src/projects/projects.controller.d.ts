import { ProjectsService } from "./projects.service";
import { projectCreationDTO } from "./DTO/project_creation_DTO";
import { Project_status } from "@prisma/client";
export declare class ProjectsController {
    private readonly projectService;
    constructor(projectService: ProjectsService);
    getProjectDetails(project_code: string): Promise<({
        history: {
            id: string;
            task_id: string;
            project_id: string;
            changed_by: string;
            task_old_status: import("@prisma/client").$Enums.Task_status;
            task_new_status: import("@prisma/client").$Enums.Task_status;
            detail: import("@prisma/client/runtime/client").JsonValue | null;
            note: string | null;
            changed_at: Date;
        }[];
        created_by: {
            phone: string;
            full_name: string;
        };
        customer: {
            name: string;
            phone: string;
        };
        tasks: ({
            taskHistory: {
                id: string;
                task_id: string;
                project_id: string;
                changed_by: string;
                task_old_status: import("@prisma/client").$Enums.Task_status;
                task_new_status: import("@prisma/client").$Enums.Task_status;
                detail: import("@prisma/client/runtime/client").JsonValue | null;
                note: string | null;
                changed_at: Date;
            }[];
            quotations: ({
                payments: {
                    id: string;
                    created_at: Date;
                    project_id: string;
                    amount: import("@prisma/client-runtime-utils").Decimal;
                    quotation_id: string | null;
                    type: import("@prisma/client").$Enums.Payment_type;
                    reference: string | null;
                    paid_at: Date;
                }[];
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                task_id: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                advance_paid: import("@prisma/client-runtime-utils").Decimal | null;
                approval_status: import("@prisma/client").$Enums.Approval_status;
                pdf_url: import("@prisma/client/runtime/client").JsonValue | null;
                approved_at: Date | null;
            })[];
        } & {
            id: string;
            description: string | null;
            status: import("@prisma/client").$Enums.Task_status;
            created_at: Date;
            updated_at: Date;
            history: string | null;
            department: import("@prisma/client").$Enums.Users_dept;
            project_id: string;
            assigned_to: string;
            assigned_by: string;
            title: string;
            notes: string | null;
            files: import("@prisma/client/runtime/client").JsonValue | null;
            work_details: string | null;
            notes_work: string | null;
            is_quotation: boolean;
            due_at: Date;
            completed_at: Date | null;
        })[];
    } & {
        id: string;
        project_code: string;
        service_type: import("@prisma/client").$Enums.Service_type;
        description: string;
        status: import("@prisma/client").$Enums.Project_status;
        current_stage: number;
        paid: import("@prisma/client-runtime-utils").Decimal;
        balance: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date;
        created_at: Date;
        updated_at: Date | null;
        created_user_phone: string;
        customer_phone: string;
    }) | undefined>;
    getActiveProjects(): Promise<{
        id: string;
        project_code: string;
        service_type: import("@prisma/client").$Enums.Service_type;
        description: string;
        deadline: Date;
        customer: {
            id: string;
            created_at: Date;
            updated_at: Date;
            name: string;
            phone: string;
            email: string | null;
            address: string | null;
            customer_type: import("@prisma/client").$Enums.Customer_type;
            referal: string | null;
        };
    }[]>;
    getActiveProjectCount(): Promise<{
        count: number;
    }>;
    createProject(requestBody: projectCreationDTO): Promise<{
        id: string;
        project_code: string;
        service_type: import("@prisma/client").$Enums.Service_type;
        description: string;
        status: import("@prisma/client").$Enums.Project_status;
        current_stage: number;
        paid: import("@prisma/client-runtime-utils").Decimal;
        balance: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date;
        created_at: Date;
        updated_at: Date | null;
        created_user_phone: string;
        customer_phone: string;
    }>;
    getProjects(): Promise<{
        id: string;
        project_code: string;
        description: string;
        status: import("@prisma/client").$Enums.Project_status;
        deadline: Date;
        customer: {
            name: string;
        };
    }[]>;
    getProject(project_code: string): Promise<{
        project_code: string;
        service_type: import("@prisma/client").$Enums.Service_type;
        description: string;
        status: import("@prisma/client").$Enums.Project_status;
        current_stage: number;
        paid: import("@prisma/client-runtime-utils").Decimal;
        balance: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date;
        created_at: Date;
        updated_at: Date | null;
        created_by: {
            email: string | null;
            full_name: string;
        };
        customer: {
            name: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
    } | undefined>;
    getfullProject(project_code: string): Promise<{
        id: string;
        project_code: string;
        service_type: import("@prisma/client").$Enums.Service_type;
        description: string;
        status: import("@prisma/client").$Enums.Project_status;
        current_stage: number;
        paid: import("@prisma/client-runtime-utils").Decimal;
        balance: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date;
        created_at: Date;
        updated_at: Date | null;
        created_by: {
            email: string | null;
            full_name: string;
        };
        customer: {
            name: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        tasks: {
            id: string;
            title: string;
            due_at: Date;
            quotations: {
                created_at: Date;
                approval_status: import("@prisma/client").$Enums.Approval_status;
            }[];
        }[];
    } | undefined>;
    getProjectHistory(id: string): Promise<{
        history: {
            id: string;
            task_id: string;
            project_id: string;
            changed_by: string;
            task_old_status: import("@prisma/client").$Enums.Task_status;
            task_new_status: import("@prisma/client").$Enums.Task_status;
            detail: import("@prisma/client/runtime/client").JsonValue | null;
            note: string | null;
            changed_at: Date;
        }[];
    } | null>;
    updateProjectStatus(id: string, requestBody: {
        status: Project_status;
    }): Promise<{
        id: string;
        project_code: string;
        service_type: import("@prisma/client").$Enums.Service_type;
        description: string;
        status: import("@prisma/client").$Enums.Project_status;
        current_stage: number;
        paid: import("@prisma/client-runtime-utils").Decimal;
        balance: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date;
        created_at: Date;
        updated_at: Date | null;
        created_user_phone: string;
        customer_phone: string;
    }>;
    incrementProjectCurrentStage(id: string): Promise<void>;
}
