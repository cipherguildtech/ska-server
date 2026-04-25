import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EventsGateway } from "../gateway/events.gateway";

@Injectable()
export class PaymentServices {
    constructor(private prisma: PrismaService, private readonly eventsGateWay: EventsGateway ) { }
    
    async getAll() {
        const payments = await this.prisma.payments.findMany({
            include: {
                quotation: true,
                project: true
            }
        });
        return payments;
    }

    async create(paymentData: any) {
        const project = paymentData.project_code
            ? await this.prisma.projects.findUnique({
                where: { project_code: paymentData.project_code },
                select: { id: true }
            })
            : null;
        const task_id =  paymentData.task_id;
        const quotation = paymentData.project_code && !paymentData.quotation_id
            ? await this.prisma.quotations.findFirst({
                where: { task_id: task_id},
                orderBy: { created_at: 'desc' },
                select: { id: true }
            })
            : null;
        const quotation_id = paymentData.quotation_id ?? quotation?.id;
        const data = paymentData.paid_at ? {
            quotation_id,
            project_id: paymentData.project_id,
            amount: paymentData.amount,
            type: paymentData.type,
            reference: paymentData.reference,
            paid_at: paymentData.paid_at,
        } : {
            quotation_id,
            project_id: paymentData.project_id,
            amount: paymentData.amount,
            type: paymentData.type,
            reference: paymentData.reference,
            paid_at: null,
        };
        const payments = await this.prisma.payments.create({
            data
        });
        this.eventsGateWay.emit("payment:created");
        return payments;
    }

    async getAllByProject(id: string) {
        const payments = await this.prisma.payments.findMany({
            where: {
                project_id: id
            },
            include: {
                quotation: true,
                project: true
            }
        });
        return payments;
    }
}
