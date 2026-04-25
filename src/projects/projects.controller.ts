import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { projectCreationDTO } from "./DTO/project_creation_DTO";
import { Project_status } from "@prisma/client";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) {}

    @Get('project_details/:id')
    async getProjectDetails (@Param('id') id: string) {
        return await this.projectService.getProjectDetails(id);
    }


    @Get('active_projects')
    async getActiveProjects () {
        return await this.projectService.getActiveProjects();
    }

    @Get('active_projects_count')
    async getActiveProjectCount() {
        return await this.projectService.getActiveProjectCount();
    }

    @Post()
    async createProject(@Body() requestBody: projectCreationDTO) {
        return await this.projectService.createProject(requestBody);
    }

    @Get()
    async getProjects() {
        return await this.projectService.getProjects();
    }

    @Get(':project_code')
    async getProject(@Param('project_code') project_code: string) {
        return await this.projectService.getProject(project_code);
    }

    @Get(':id/history')
    async getProjectHistory(@Param('id') id: string) {
        return await this.projectService.getProjectHistory(id);
    }

    @Put(':id/status')
    async updateProjectStatus(@Param("id") id: string, @Body() requestBody: {status: Project_status}) {
        return await this.projectService.updateProjectStatus(id, requestBody);
    }

    @Put(':id/increment')
    async incrementProjectCurrentStage(@Param("id") id : string) {
        return this.projectService.incrementProjectCurrentStage(id);
    }
}