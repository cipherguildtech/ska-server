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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const events_gateway_1 = require("../gateway/events.gateway");
let ProjectHistoryService = class ProjectHistoryService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async getAll() {
        return this.prisma.projectHistory.findMany();
    }
    async create(data) {
        const project = data.project_code
            ? await this.prisma.projects.findUnique({ where: { project_code: data.project_code }, select: { id: true } })
            : null;
        const task = data.task_title && (project?.id ?? data.project_id)
            ? await this.prisma.tasks.findFirst({
                where: {
                    project_id: project?.id ?? data.project_id,
                    title: data.task_title,
                },
                orderBy: { created_at: 'desc' },
                select: { id: true },
            })
            : null;
        const projectHistory = await this.prisma.projectHistory.create({
            data: {
                task_id: task?.id ?? data.task_id,
                project_id: project?.id ?? data.project_id,
                changed_by: data.changed_by,
                task_old_status: data.task_old_status,
                task_new_status: data.task_new_status,
                detail: data.detail,
                note: data.note,
                changed_at: new Date(),
                user: { connect: { phone: data.changed_by } },
                project: { connect: { id: project?.id ?? data.project_id } },
                task: { connect: { id: task?.id ?? data.task_id } },
            }
        });
        this.eventsGateway.emit("project_history:created");
        return projectHistory;
    }
    async update(id, data) {
        const projectHistory = await this.prisma.projectHistory.update({
            where: { id },
            data: {
                changed_by: data.changed_by,
                note: data.note,
            }
        });
        this.eventsGateway.emit("project_history:updated");
        return projectHistory;
    }
};
exports.ProjectHistoryService = ProjectHistoryService;
exports.ProjectHistoryService = ProjectHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, events_gateway_1.EventsGateway])
], ProjectHistoryService);
//# sourceMappingURL=project_history.service.js.map