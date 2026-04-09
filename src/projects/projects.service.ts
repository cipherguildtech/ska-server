import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Project_status } from "@prisma/client";

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

    async createProject(requestBody) {
        try {
            return await this.prisma.projects.create(
                {data: requestBody}
            )
        }
        catch(e) {

        }
    }

    async getProjects() {
        try {
            return await this.prisma.projects.findMany(
                {
                    select: {
                        id: true,
                        project_code: true,
                        deadline: true,
                        description: true,
                        customer: true,
                        service_type: true,
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
            return await this.prisma.projects.findFirstOrThrow(
                {where: {id}}
            )
        }
        catch(e) {
            if( e instanceof PrismaClientKnownRequestError) {
                if(e.code == 'P2025') {
                    throw new NotFoundException('customer not exsists')
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

        }
    }

    async updateProjectStatus(id: string, requestBody: {status: string}) {

        try {
            const Status = requestBody.status as Project_status
            return await this.prisma.projects.update(
                {
                    data: {status: Status},
                    where: {id}
                }
            )
        }
        catch(e) {
            
        }
    }
}