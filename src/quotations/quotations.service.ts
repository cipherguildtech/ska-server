import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Approval_status } from "@prisma/client";

@Injectable()
export class QuotationServices {
    constructor(private prisma: PrismaService) { }
    async getAll() {
        const quotations = await this.prisma.quotations.findMany({
            include: {
                payments: true,
                task: true
            }
        });
        return quotations;
    }
    async create(body: any) {
        const project = body.project_code
            ? await this.prisma.projects.findUnique({ where: { project_code: body.project_code }, select: { id: true } })
            : null;
        const quotations = await this.prisma.quotations.create({
            data: {
                task_id: body.task_id,
                amount: body.amount,
                advance_paid: body.advance_paid,
                approval_status: body.approval_status,
                pdf_url: body.pdf_url,

            }
        });
        return quotations;
    }

    async update(id:string ,body: any) {
        const quotations = await this.prisma.quotations.update({
            where: {
                id: id
            },
            data: {
                task_id: body.task_id,
                amount: body.amount,
                advance_paid: body.advance_paid,
                approval_status: body.approval_status,
                pdf_url: body.pdf_url,

            }
        });
        return quotations;
    }
    async getAllByProjectStatus(id:string, status:string){
        if(status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED"){
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.findMany({
            where: {
                task_id:id,
                approval_status:status.toUpperCase() as Approval_status
            },
            include:{
                task:true,
                payments:true
            }});
        return quotations;
    }

    async updateStatus(id:string, status:string){
        if(status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED"){
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.update({
            where: {
                id:id
            },
            data:{
                approval_status:status.toUpperCase() as Approval_status 
            },
          });
        return quotations;  

        }

        async getAllByStatus(  status:string){
        if(status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED"){
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.findMany({
            where: {
                approval_status:status.toUpperCase() as Approval_status
            },
            include:{
                task:true,
                payments:true
            }});
        return quotations;
    }
}
