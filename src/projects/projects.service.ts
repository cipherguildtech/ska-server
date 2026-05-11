import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Project_status } from "@prisma/client";
import { projectCreationDTO } from "./DTO/project_creation_DTO";
import { EventsGateway } from "../gateway/events.gateway";

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService, private readonly eventsGateway: EventsGateway) { }

    async getProjectDetails(project_code: string) {
        try {
            const project = await this.prisma.projects.findUniqueOrThrow(
                {
                    where: {
                        project_code
                    },
                    select: {
                        project_code: true,
                        created_at: true,
                        current_stage: true,
                        customer: {
                            select: {
                                name: true,
                                phone: true,
                            }
                        },
                        created_by: {
                            select: {
                                full_name: true,
                                phone: true
                            }
                        },
                        description: true,
                        deadline: true,
                        status: true,
                        service_type: true,
                        tasks: {
                            select: {
                                assignee: {
                                    select: {
                                        full_name: true,
                                        phone: true,
                                    },
                                },
                                assigner: {
                                    select: {
                                        full_name: true,
                                        phone: true
                                    }
                                },
                                created_at: true,
                                department: true,
                                description: true,
                                due_at: true,
                                title: true,
                                status: true,
                                notes: true,
                                work_details: true,
                                updated_at: true,
                                taskHistory: {
                                    select: {
                                        changed_at: true,
                                        detail: true,
                                        note: true,
                                        task_new_status: true,
                                        task_old_status: true,
                                        changed_by: true
                                    }
                                },

                                quotations: {
                                    where: {
                                        task: {
                                            is_quotation: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            );

            return project;
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new NotFoundException('project not exsists')
                }
            }
            else {
                throw new InternalServerErrorException('something went wrong');
            }
        }
    }

    async getActiveProjects() {
        try {
            return await this.prisma.projects.findMany(
                {
                    where: {
                        deadline: {
                            lte: new Date()
                        }
                    },
                    orderBy: {
                        deadline: "asc"
                    },
                    select: {
                        id: true,
                        customer: true,
                        service_type: true,
                        deadline: true,
                        description: true,
                        project_code: true,
                    },
                }
            )
        }
        catch (e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async getActiveProjectCount() {
        try {
            const activeProjectCount = await this.prisma.projects.count(
                {
                    where: {
                        deadline: {
                            lte: new Date(),
                        }
                    }
                }
            );
            return {
                "count": activeProjectCount

            }
        }
        catch (e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async createProject(requestBody: projectCreationDTO) {
        try {
            const project = await this.prisma.projects.create(
                {
                    data: {
                        project_code: requestBody.project_code,
                        description: requestBody.description,
                        deadline: new Date(requestBody.deadline),
                        created_user_email: requestBody.created_user_email,
                        customer_email: requestBody.customer_email,
                        service_type: requestBody.service_type,
                    }
                }
            );
            this.eventsGateway.emit("project:created");
            return project;

        }
        catch (e) {
            console.log(e);
            throw new InternalServerErrorException('something went wrong');
        }
    }

    async getProjects() {
        try {
            return await this.prisma.projects.findMany(
                {
                    select: {
                        id: true,
                        project_code: true,
                        status: true,
                        deadline: true,
                        description: true,
                        customer: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            );
        }
        catch (e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async getProject(project_code: string) {
        try {
            return await this.prisma.projects.findUniqueOrThrow(
                {
                    where: { project_code },
                    select: {
                        project_code: true,
                        status: true,
                        service_type: true,
                        deadline: true,
                        description: true,
                        current_stage: true,
                        created_by: {
                            select: {
                                full_name: true,
                                email: true,
                            },
                        },
                        balance: true,
                        created_at: true,
                        customer: {
                            select: {
                                name: true,
                                email: true,
                                address: true,
                                phone: true,
                            }
                        },
                        paid: true,
                        updated_at: true,
                    },

                },
            )
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new NotFoundException('project not exsists')
                }
            }
            else {
                throw new InternalServerErrorException("something went wrong");
            }
        }

    }
    async getfullProject(project_code: string) {
        try {
            return await this.prisma.projects.findUniqueOrThrow(
                {
                    where: { project_code },
                   
                        
                     select: {
                        project_code: true,
                        status: true,
                        service_type: true,
                        deadline: true,
                        description: true,
                        current_stage: true,
                        created_by: {
                            select: {
                                full_name: true,
                                email: true,
                            },
                        },
                        balance: true,
                        created_at: true,
                        customer: {
                            select: {
                                name: true,
                                email: true,
                                address: true,
                                phone: true,
                            }
                        },
                        paid: true,
                        updated_at: true,
                        tasks: {
                            where: {
                                due_at: {
                                    gte: new Date(),
                                }
                            },
                            select: {
                                title: true,
                                due_at: true,
                                quotations:{
                                    where:{
                                        approval_status: {
                                            notIn: ['REJECTED', "APPROVED"]
                                        }
                                    },
                                    select:{
                                        created_at: true,
                                        approval_status: true,
                                    }
                                    },
                                    
                                }
                            }
                        },

                },
            )
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new NotFoundException('project not exsists')
                }
            }
            else {
                throw new InternalServerErrorException("something went wrong");
            }
        }

    }
    async getProjectHistory(id: string) {
        try {
            return await this.prisma.projects.findUnique(
                {
                    where: { id },
                    select: { history: true }
                }
            )
        }
        catch (e) {
            throw new InternalServerErrorException('something went wrong')
        }
    }

    async updateProjectStatus(id: string, requestBody: { status: Project_status }) {
        try {
            const project = await this.prisma.projects.findFirst({
                where: {
                    OR: [
                        { id },
                        { project_code: id },
                    ],
                },
                select: { id: true },
            });
            const projectStatus = await this.prisma.projects.update(
                {
                    data: { status: requestBody.status },
                    where: { id: project?.id ?? id }
                }
            )
            this.eventsGateway.emit("project_status:updated");
            return projectStatus;
        }
        catch (e) {
            throw new InternalServerErrorException("something went wrong");

        }
    }

    async incrementProjectCurrentStage(id: string) {
        try {
            await this.prisma.projects.update(
                {
                    where: { id },
                    data: {
                        current_stage: {
                            increment: 1
                        }
                    }
                }
            );
            this.eventsGateway.emit("project_stage:updated")
        }
        catch (e) {
            throw new InternalServerErrorException('something went wrong');
        }
    }
}
