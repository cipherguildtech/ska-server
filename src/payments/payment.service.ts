import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PaymentServices {
    constructor(private prisma: PrismaService) { }
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
        const data= paymentData.paid_at?{
                quotation_id: paymentData.quotation_id,
                project_id: paymentData.project_id,
                amount: paymentData.amount,
                type: paymentData.type,
                reference: paymentData.reference,
                paid_at: paymentData.paid_at,
            }:{
                quotation_id: paymentData.quotation_id,
                project_id: paymentData.project_id,
                amount: paymentData.amount,
                type: paymentData.type,
                reference: paymentData.reference,
                paid_at: null,
            };
        const payments = await this.prisma.payments.create({
            data
        });
        return payments;

        
  
  
    }
}