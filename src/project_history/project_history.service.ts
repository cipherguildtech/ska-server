import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
    export class ProjectHistoryService {
        constructor(private prisma: PrismaService) { }
        async getAll() {
            return this.prisma.projectHistory.findMany();
        }
        async create(data: any) {
            return this.prisma.projectHistory.create({
                data:{
                    project_id: data.project_id,
                    changed_by: data.changed_by,
                    stages:data.stages,
                    statuses:data.statuses,
                    note:data.note,
                }
            });
        }
        async update(id: string, data: any) {
            return this.prisma.projectHistory.update({
                where: { id },
                data: {
                    changed_by: data.changed_by,
                    stages:data.stages,
                    statuses:data.statuses,
                    note:data.note,
                }
            });
        }
}