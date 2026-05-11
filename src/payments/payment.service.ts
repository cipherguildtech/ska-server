import { Injectable ,BadRequestException} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EventsGateway } from "../gateway/events.gateway";
import { CreatePaymentDto } from "./dto/create-payment.dto";

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

    // async create(paymentData: any) {
    //     const project = paymentData.project_code
    //         ? await this.prisma.projects.findUnique({
    //             where: { project_code: paymentData.project_code },
    //             select: { id: true }
    //         })
    //         : null;
    //     const project_id = project?.id ?? paymentData.project_id;
    //     const quotation = project_id && !paymentData.quotation_id
    //         ? await this.prisma.quotations.findFirst({
    //             where: {
    //                 task: {
    //                     project_id,
    //                 },
    //             },
    //             orderBy: { created_at: 'desc' },
    //             select: { id: true }
    //         })
    //         : null;
    //     const quotation_id = paymentData.quotation_id ?? quotation?.id;
    //     const data = paymentData.paid_at ? {
    //         quotation_id,
    //         project_id,
    //         amount: paymentData.amount,
    //         type: paymentData.type,
    //         reference: paymentData.reference,
    //         paid_at: paymentData.paid_at,
    //     } : {
    //         quotation_id,
    //         project_id,
    //         amount: paymentData.amount,
    //         type: paymentData.type,
    //         reference: paymentData.reference,
    //         paid_at: null,
    //     };
    //     const payments = await this.prisma.payments.create({
    //         data
    //     });
    //     this.eventsGateWay.emit("payment:created");
    //     return payments;
    // }

     async createPayment(dto: CreatePaymentDto) {
    try {
      const payment = await this.prisma.payments.create({
        data: {
          project_id: dto.project_id,
          quotation_id: dto.quotation_id,
          amount: dto.amount,
          type: dto.type,
          reference: dto.reference,
          paid_at: new Date(dto.paid_at),
        },
        include: {
          project: true,
          quotation: true,
        },
      });

      return {
        success: true,
        message: 'Payment created successfully',
        data: payment,
      };
    } catch (error) {
      console.log(error.message);
      
      throw new BadRequestException(error.message);
    }
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
