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
            const projectHistory = this.prisma.projectHistory.create({
                data:{
                    project_id: data.project_id,
                    changed_by: data.changed_by,
                    stages:data.stages,
                    statuses:data.statuses,
                    note:data.note,
                }
            });
            this.eventsGateway.emit("project_history:created");
            return projectHistory;
        }

        
        async update(id: string, data: any) {
                const projectHistory = this.prisma.projectHistory.update({
                where: { id },
                data: {
                    changed_by: data.changed_by,
                    stages:data.stages,
                    statuses:data.statuses,
                    note:data.note,
                }
            });
            this.eventsGateway.emit("project_history:updated");
            return projectHistory;
        }
}