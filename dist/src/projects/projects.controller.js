"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const project_creation_DTO_1 = require("./DTO/project_creation_DTO");
let ProjectsController = class ProjectsController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getProjectDetails(project_code) {
        return await this.projectService.getProjectDetails(project_code);
    }
    async getActiveProjects() {
        return await this.projectService.getActiveProjects();
    }
    async getActiveProjectCount() {
        return await this.projectService.getActiveProjectCount();
    }
    async createProject(requestBody) {
        return await this.projectService.createProject(requestBody);
    }
    async getProjects() {
        return await this.projectService.getProjects();
    }
    async getProject(project_code) {
        return await this.projectService.getProject(project_code);
    }
    async getfullProject(project_code) {
        return await this.projectService.getfullProject(project_code);
    }
    async getProjectHistory(id) {
        return await this.projectService.getProjectHistory(id);
    }
    async updateProjectStatus(id, requestBody) {
        return await this.projectService.updateProjectStatus(id, requestBody);
    }
    async incrementProjectCurrentStage(id) {
        return this.projectService.incrementProjectCurrentStage(id);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)('project_details/:project_code'),
    __param(0, (0, common_1.Param)('project_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjectDetails", null);
__decorate([
    (0, common_1.Get)('active_projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getActiveProjects", null);
__decorate([
    (0, common_1.Get)('active_projects_count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getActiveProjectCount", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_creation_DTO_1.projectCreationDTO]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Get)(':project_code'),
    __param(0, (0, common_1.Param)('project_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProject", null);
__decorate([
    (0, common_1.Get)('full/:project_code'),
    __param(0, (0, common_1.Param)('project_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getfullProject", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjectHistory", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProjectStatus", null);
__decorate([
    (0, common_1.Put)(':id/increment'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "incrementProjectCurrentStage", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map