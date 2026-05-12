import { PrismaService } from "../prisma/prisma.service";
import { Project_status } from "@prisma/client";
import { projectCreationDTO } from "./DTO/project_creation_DTO";
import { EventsGateway } from "../gateway/events.gateway";
export declare class ProjectsService {
    private readonly prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    getProjectDetails(project_code: string): Promise<({
        customer: {
            name: string;
            phone: string;
        };
        tasks: ({
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
            taskHistory: {
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
        } & {
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
        })[];
        history: {
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
        created_by: {
            phone: string;
            full_name: string;
        };
    } & {
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
    }) | undefined>;
    getActiveProjects(): Promise<{
        customer: {
            name: string;
            phone: string;
            email: string | null;
            address: string | null;
            customer_type: import("@prisma/client").$Enums.Customer_type;
            id: string;
            referal: string | null;
            created_at: Date;
            updated_at: Date;
        };
        id: string;
        project_code: string;
        service_type: import("@prisma/client").$Enums.Service_type;
        description: string;
        deadline: Date;
    }[]>;
    getActiveProjectCount(): Promise<{
        count: number;
    }>;
    createProject(requestBody: projectCreationDTO): Promise<{
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
    }>;
    getProjects(): Promise<{
        customer: {
            name: string;
        };
        id: string;
        project_code: string;
        description: string;
        status: import("@prisma/client").$Enums.Project_status;
        deadline: Date;
    }[]>;
    getProject(project_code: string): Promise<{
        customer: {
            name: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
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
        created_by: {
            email: string | null;
            full_name: string;
        };
    } | undefined>;
    getfullProject(project_code: string): Promise<{
        customer: {
            name: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        tasks: {
            quotations: {
                created_at: Date;
                approval_status: import("@prisma/client").$Enums.Approval_status;
            }[];
            id: string;
            title: string;
            due_at: Date;
        }[];
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
        created_by: {
            email: string | null;
            full_name: string;
        };
    } | undefined>;
    getProjectHistory(id: string): Promise<{
        history: {
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
    } | null>;
    updateProjectStatus(id: string, requestBody: {
        status: Project_status;
    }): Promise<{
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
    }>;
    incrementProjectCurrentStage(id: string): Promise<void>;
}
