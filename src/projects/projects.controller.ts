import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) {}
    @Post()
    async createProject(@Body() requestBody: {}) {
        return await this.projectService.createProject(requestBody);
    }

    @Get()
    async getProjects() {
        return await this.projectService.getProjects();
    }

    @Get(':id')
    async getProject(@Param('id') id: string) {
        return await this.projectService.getProject(id);
    }

    @Get(':id/history')
    async getProjectHistory(@Param('id') id: string) {
        return await this.projectService.getProjectHistory(id);
    }

    @Put(':id/status')
    async updateProjectStatus(@Param("id") id: string, @Body() requestBody: {status: string}) {
        return await this.projectService.updateProjectStatus(id, requestBody);
    }
}