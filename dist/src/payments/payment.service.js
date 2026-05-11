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
exports.PaymentServices = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const events_gateway_1 = require("../gateway/events.gateway");
let PaymentServices = class PaymentServices {
    prisma;
    eventsGateWay;
    constructor(prisma, eventsGateWay) {
        this.prisma = prisma;
        this.eventsGateWay = eventsGateWay;
    }
    async getAll() {
        const payments = await this.prisma.payments.findMany({
            include: {
                quotation: true,
                project: true
            }
        });
        return payments;
    }
    async createPayment(dto) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAllByProject(id) {
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
};
exports.PaymentServices = PaymentServices;
exports.PaymentServices = PaymentServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, events_gateway_1.EventsGateway])
], PaymentServices);
//# sourceMappingURL=payment.service.js.map