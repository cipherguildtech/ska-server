import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class QuotationServices {
    constructor(private prisma: PrismaService) { }
    async getAll() {
        const quotations = await this.prisma.quotations.findMany({
            include: {
                payments: true,
                project: true
            }
        });
        return quotations;
    }
    async create(body: any) {
        const quotations = await this.prisma.quotations.create({
            data: {
                project_id: body.project_id,
                amount: body.amount,
                advance_paid: body.advance_paid,
                approval_status: body.approval_status,
                pdf_url: body.pdf_url,

            }
        });
        return quotations;
    }
    async update(id:string ,body: any) {
        const quotations = await this.prisma.quotations.create({
            data: {
                project_id: body.project_id,
                amount: body.amount,
                advance_paid: body.advance_paid,
                approval_status: body.approval_status,
                pdf_url: body.pdf_url,

            }
        });
        return quotations;
    }

}