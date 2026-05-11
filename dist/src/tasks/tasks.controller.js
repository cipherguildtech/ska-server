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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async getTaskSingle(id) {
        console.log(id);
        return await this.tasksService.getTaskSingle(id);
    }
    async saveTaskFiles(id, requestBody) {
        await this.tasksService.saveTaskFiles(id, requestBody.images);
    }
    async acceptOrReject(requestBody) {
        await this.tasksService.acceptOrReject(requestBody.task_id, requestBody.action, requestBody.phone, requestBody.reason);
    }
    getAllTasks() {
        return this.tasksService.getAll();
    }
    createTasks(body) {
        return this.tasksService.createTasks(body);
    }
    Update(id, body) {
        return this.tasksService.updateTasks(id, body);
    }
    Delete(id) {
        return this.tasksService.deleteTasks(id);
    }
    getAllByAssignedTo(assigned_to) {
        return this.tasksService.getAllAssignedTo(assigned_to);
    }
    getCount(dept, assigned_to) {
        return this.tasksService.getCount(dept, assigned_to);
    }
    updateNotes(id, body) {
        return this.tasksService.updateNotes(id, body);
    }
    updateStatus(id, status, completed_at, requestBody) {
        return this.tasksService.updateStatus(id, status, completed_at);
    }
    getAllByProjectId(project_id) {
        return this.tasksService.getAllByProjectId(project_id);
    }
    getAllByAssignedBy(assigned_by) {
        return this.tasksService.getAllAssignedBy(assigned_by);
    }
    getAllByDepartment(department) {
        return this.tasksService.getAllByDept(department);
    }
    getAllByTitle(title) {
        return this.tasksService.getAllByTitle(title);
    }
    getAllByStatus(status) {
        return this.tasksService.getAllByStatus(status);
    }
    getHrDashboard() {
        console.log('entered');
        return this.tasksService.getHrDashboard();
    }
    taskboard() {
        return this.tasksService.taskboard();
    }
    teams() {
        return this.tasksService.teams();
    }
    elabrateTeams() {
        return this.tasksService.elabrateTeams();
    }
    async getTask(id) {
        return await this.tasksService.getTask(id);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)('task/details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskSingle", null);
__decorate([
    (0, common_1.Post)('save_files/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "saveTaskFiles", null);
__decorate([
    (0, common_1.Post)('accept_or_reject'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "acceptOrReject", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "createTasks", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "Update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "Delete", null);
__decorate([
    (0, common_1.Get)('all_by_assigned_to/:assigned_to'),
    __param(0, (0, common_1.Param)('assigned_to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllByAssignedTo", null);
__decorate([
    (0, common_1.Get)('count/:dept/:assigned_to'),
    __param(0, (0, common_1.Param)('dept')),
    __param(1, (0, common_1.Param)('assigned_to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getCount", null);
__decorate([
    (0, common_1.Put)('update_notes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "updateNotes", null);
__decorate([
    (0, common_1.Put)('update_status/:id/:status/:completed_at'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('status')),
    __param(2, (0, common_1.Param)('completed_at')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('all_project/:project_id'),
    __param(0, (0, common_1.Param)('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllByProjectId", null);
__decorate([
    (0, common_1.Get)('all_assigned_by/:assigned_by'),
    __param(0, (0, common_1.Param)('assigned_by')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllByAssignedBy", null);
__decorate([
    (0, common_1.Get)('all_by_department/:department'),
    __param(0, (0, common_1.Param)('department')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllByDepartment", null);
__decorate([
    (0, common_1.Get)('all_by_title/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllByTitle", null);
__decorate([
    (0, common_1.Get)('all_by_status/:status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllByStatus", null);
__decorate([
    (0, common_1.Get)('dashboard/hr'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getHrDashboard", null);
__decorate([
    (0, common_1.Get)('taskboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "taskboard", null);
__decorate([
    (0, common_1.Get)('teams'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "teams", null);
__decorate([
    (0, common_1.Get)('elaborate_teams'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "elabrateTeams", null);
__decorate([
    (0, common_1.Get)('single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map