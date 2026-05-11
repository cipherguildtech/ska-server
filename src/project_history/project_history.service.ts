import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EventsGateway } from "../gateway/events.gateway";

@Injectable()
    export class ProjectHistoryService {
        constructor(private prisma: PrismaService, private readonly eventsGateway: EventsGateway) { }
        async getAll() {
            return this.prisma.projectHistory.findMany();
        }
        async create(data: any) {
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
                data:{
                    task_id: task?.id ?? data.task_id,
                    project_id: project?.id ?? data.project_id,
                    changed_by: data.changed_by,
                    task_old_status: data.task_old_status,
                    task_new_status: data.task_new_status,
                    detail: data.detail,
                    note: data.note,
                    changed_at: new Date(),
                }
            });
            this.eventsGateway.emit("project_history:created");
            return projectHistory;
        }

        
        async update(id: string, data: any) {
                const projectHistory = await this.prisma.projectHistory.update({
                where: { id },
                data: {
                    changed_by: data.changed_by,
                    note:data.note,
                }
            });
            this.eventsGateway.emit("project_history:updated");
            return projectHistory;
        }
}
