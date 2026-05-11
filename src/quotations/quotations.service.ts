import { Injectable, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Approval_status } from "@prisma/client";
import { CreateQuotationDto } from "./dto/create-quotation.dto";
import { cloudinary } from '../../cloundinary_config';
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

    async getAllById(id: string) {
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

    // async create(body: any) {
    //     const project = body.project_code
    //         ? await this.prisma.projects.findUnique({ where: { project_code: body.project_code }, select: { id: true } })
    //         : null;
    //     const project_id = project?.id ?? body.project_id;
    //     const task = body.task_id
    //         ? { id: body.task_id }
    //         : await this.prisma.tasks.findFirst({
    //             where: {
    //                 project_id,
    //                 ...(body.task_title ? { title: body.task_title } : {}),
    //             },
    //             orderBy: [
    //                 { is_quotation: 'desc' },
    //                 { created_at: 'asc' },
    //             ],
    //             select: { id: true },
    //         });
    //     if (!task?.id) {
    //         throw new NotFoundException("quotation task not found for project");
    //     }
    //     const quotations = await this.prisma.quotations.create({
    //         data: {
    //             task_id: task?.id,
    //             amount: body.amount,
    //             advance_paid: body.advance_paid,
    //             approval_status: body.approval_status,
    //             pdf_url: body.pdf_url,
    //         }
    //     });
    //     return quotations;
    // }

    // async createQuotation(dto: CreateQuotationDto) {

    //     try {
    //         const quotation = await this.prisma.quotations.create({
    //             data: {
    //                 task_id: dto.task_id,
    //                 amount: dto.amount,
    //                 advance_paid: dto.advance_paid,
    //                 approval_status: dto.approval_status || 'DRAFT',
    //                 pdf_url: dto.pdf_url,
    //             },
    //             include: {
    //                 task: true,
    //             },
    //         });

    //         return {
    //             success: true,
    //             message: 'Quotation created successfully',
    //             data: quotation,
    //         };
    //     } catch (error) {
    //         console.log(error.message);

    //         throw new BadRequestException(error);
    //     }
    // }


    async uploadPdf(files: string[]) {
        try {
            const urls: string[] = [];

            for (let base64 of files) {
                const mimeType = 'application/pdf';
                base64 = base64.trim();

                const dataUrl = base64.startsWith('data:')
                    ? base64
                    : `data:${mimeType};base64,${base64}`;

                if (!dataUrl.includes('JVBER')) {
                    throw new BadRequestException('Only PDF files are allowed');
                }

                const uploaded = await cloudinary.uploader.upload(dataUrl, {
                    folder: 'ska_pdfs',
                    resource_type: 'raw',
                    format: 'pdf',
                    use_filename: true,
                });

                urls.push(uploaded.secure_url || uploaded.url);
            }

            return urls;
        } catch (e) {
            console.log('uploadPdf error:', e);
            throw new InternalServerErrorException('Something went wrong while uploading PDF files');
        }
    }
    async createQuotation(dto: CreateQuotationDto) {
        try {
            let uploadedPdfUrls: string[] = [];

            if (dto.pdf_url && dto.pdf_url.length > 0) {
                uploadedPdfUrls = await this.uploadPdf(dto.pdf_url);
            }

            const quotation = await this.prisma.quotations.create({
                data: {
                    task_id: dto.task_id,
                    amount: dto.amount,
                    advance_paid: dto.advance_paid,
                    approval_status: dto.approval_status || 'DRAFT',

                    // array of pdf urls
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
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error.message);
        }
    }

    async update(id: string, body: any) {
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
    async getAllByProjectStatus(id: string, status: string) {
        if (status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED") {
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.findMany({
            where: {
                task_id: id,
                approval_status: status.toUpperCase() as Approval_status
            },
            include: {
                task: true,
                payments: true
            }
        });
        return quotations;
    }

    async updateStatus(id: string, status: string) {
        if (status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED") {
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.update({
            where: {
                id: id
            },
            data: {
                approval_status: status.toUpperCase() as Approval_status
            },
        });
        return quotations;

    }

    async getAllByStatus(status: string) {
        if (status.toUpperCase() !== "DRAFT" && status.toUpperCase() !== "APPROVED" && status.toUpperCase() !== "SENT" && status.toUpperCase() !== "REJECTED") {
            return "Invalid status";
        }
        const quotations = await this.prisma.quotations.findMany({
            where: {
                approval_status: status.toUpperCase() as Approval_status
            },
            include: {
                task: true,
                payments: true
            }
        });
        return quotations;
    }
    async getAllBycode(code: string) {

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
}
