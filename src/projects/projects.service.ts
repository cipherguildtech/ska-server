import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

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
            return await this.prisma.projects.findMany();
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

    async updateProjectStatus(id: string, requestBody) {
        try {
            return await this.prisma.projects.update(
                {
                    data: requestBody,
                    where: {id}
                }
            )
        }
        catch(e) {
            
        }
    }
}