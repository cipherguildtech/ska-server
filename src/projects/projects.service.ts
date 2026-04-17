import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Project_status } from "@prisma/client";
import { projectCreationDTO } from "./DTO/project_creation_DTO";

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

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
        catch(e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async getActiveProjectCount() {
        try {
            const activeProjectCount =  await this.prisma.projects.count(
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
        catch(e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async createProject(requestBody: projectCreationDTO) {
        try {
            return await this.prisma.projects.create(
                {data: requestBody}
            )
        }
        catch(e) {
            throw new InternalServerErrorException('something went wrong');
        }
    }

    async getProjects() {
        try {
            return await this.prisma.projects.findMany(
                {
                    select: {
                        project_code: true,
                        status: true,
                        deadline: true,
                        description: true,
                    }
                }
            );
        }
        catch(e) {
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async getProject(id: string) {
        try {
            return await this.prisma.projects.findUniqueOrThrow(
                {
                    where: {id},
                    select:{
                        tasks: {
                            omit: {
                                id: true,
                            },
                        },
                        project_code: true,
                        status: true,
                        service_type: true,
                        deadline: true,
                        description: true,
                        current_stage: true,
                    },
    
                },
            )
        }
        catch(e) {
            if( e instanceof PrismaClientKnownRequestError) {
                if(e.code == 'P2025') {
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
                    where: {id},
                    select: {history: true}
                }
            )
        }
        catch(e) {
            throw new InternalServerErrorException('something went wrong')
        }
    }

    async updateProjectStatus(id: string, requestBody: {status: Project_status}) {
        try {
            return await this.prisma.projects.update(
                {
                    data: {status: requestBody.status},
                    where: {id}
                }
            )
        }
        catch(e) {
            throw new InternalServerErrorException("something went wrong");
            
        }
    }

    async incrementProjectCurrentStage(id: string) {
        try {
            await this.prisma.projects.update(
                {
                    where: {id},
                    data: {
                        current_stage: {
                            increment: 1
                        }
                    }
                }
            )
        }
        catch(e) {
            throw new InternalServerErrorException('something went wrong');
        }
    }
}