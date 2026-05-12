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
exports.QuotationServices = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cloundinary_config_1 = require("../../cloundinary_config");
let QuotationServices = class QuotationServices {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        const quotations = await this.prisma.quotations.findMany({
            include: {
                payments: true,
                task: true
            }
        });
        return quotations;
    }
    async getAllById(id) {
        const quotations = await this.prisma.quotations.findUnique({
            where: {
                id: id
            },
            include: {
                task: true,
                payments: true
            }
        });
        return quotations;
    }
    async uploadPdf(files) {
        try {
            const urls = [];
            for (let base64 of files) {
                const mimeType = 'application/pdf';
                base64 = base64.trim();
                const dataUrl = base64.startsWith('data:')
                    ? base64
                    : `data:${mimeType};base64,${base64}`;
                if (!dataUrl.includes('JVBER')) {
                    throw new common_1.BadRequestException('Only PDF files are allowed');
                }
                const uploaded = await cloundinary_config_1.cloudinary.uploader.upload(dataUrl, {
                    folder: 'ska_pdfs',
                    resource_type: 'raw',
                    format: 'pdf',
                    use_filename: true,
                });
                urls.push(uploaded.secure_url || uploaded.url);
            }
            return urls;
        }
        catch (e) {
            console.log('uploadPdf error:', e);
            throw new common_1.InternalServerErrorException('Something went wrong while uploading PDF files');
        }
    }
    async createQuotation(dto) {
        try {
            let uploadedPdfUrls = [];
            if (dto.pdf_url && dto.pdf_url.length > 0) {
                uploadedPdfUrls = await this.uploadPdf(dto.pdf_url);
            }
            const quotation = await this.prisma.quotations.create({
                data: {
                    task_id: dto.task_id,
                    amount: dto.amount,
                    advance_paid: dto.advance_paid,
                    approval_status: dto.approval_status || 'DRAFT',
                    pdf_url: uploadedPdfUrls,
                },
                include: {
                    task: true,
                },
            });
            return {
                success: true,
                message: 'Quotation created successfully',
                data: quotation,
            };
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, body) {
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
    async getAllByProjectStatus(id, status) {
        if (status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED") {
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.findMany({
            where: {
                task_id: id,
                approval_status: status.toUpperCase()
            },
            include: {
                task: true,
                payments: true
            }
        });
        return quotations;
    }
    async updateStatus(id, status) {
        if (status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED") {
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.update({
            where: {
                id: id
            },
            data: {
                approval_status: status.toUpperCase()
            },
        });
        return quotations;
    }
    async getAllByStatus(status) {
        if (status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED") {
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.findMany({
            where: {
                approval_status: status.toUpperCase()
            },
            include: {
                task: true,
                payments: true
            }
        });
        return quotations;
    }
    async getAllBycode(code) {
        const quotations = await this.prisma.quotations.findMany({
            where: {
                task: {
                    project: {
                        project_code: code
                    }
                }
            },
            include: {
                task: {
                    select: {
                        project_id: true,
                        title: true,
                    }
                }
            }
        });
        return quotations;
    }
};
exports.QuotationServices = QuotationServices;
exports.QuotationServices = QuotationServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuotationServices);
//# sourceMappingURL=quotations.service.js.map