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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client/runtime/client");
const events_gateway_1 = require("../gateway/events.gateway");
let ProjectsService = class ProjectsService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async getProjectDetails(project_code) {
        try {
            const project = await this.prisma.projects.findUniqueOrThrow({
                where: {
                    project_code
                },
                include: {
                    tasks: {
                        include: {
                            quotations: {
                                include: {
                                    payments: true
                                }
                            },
                            taskHistory: true,
                        }
                    },
                    history: true,
                    customer: {
                        select: {
                            name: true,
                            phone: true,
                        }
                    },
                    created_by: {
                        select: {
                            full_name: true,
                            phone: true,
                        }
                    }
                }
            });
            return project;
        }
        catch (e) {
            if (e instanceof client_1.PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new common_1.NotFoundException('project not exsists');
                }
            }
            else {
                throw new common_1.InternalServerErrorException('something went wrong');
            }
        }
    }
    async getActiveProjects() {
        try {
            return await this.prisma.projects.findMany({
                where: {
                    deadline: {
                        lte: new Date()
                    }
                },
                orderBy: {
                    deadline: "asc"
                },
                select: {
                    id: true,
                    customer: true,
                    service_type: true,
                    deadline: true,
                    description: true,
                    project_code: true,
                },
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("something went wrong");
        }
    }
    async getActiveProjectCount() {
        try {
            const activeProjectCount = await this.prisma.projects.count({
                where: {
                    deadline: {
                        lte: new Date(),
                    }
                }
            });
            return {
                "count": activeProjectCount
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("something went wrong");
        }
    }
    async createProject(requestBody) {
        try {
            const project = await this.prisma.projects.create({
                data: {
                    project_code: requestBody.project_code,
                    description: requestBody.description,
                    deadline: new Date(requestBody.deadline),
                    created_user_email: requestBody.created_user_email,
                    customer_email: requestBody.customer_email,
                    service_type: requestBody.service_type,
                }
            });
            this.eventsGateway.emit("project:created");
            return project;
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async getProjects() {
        try {
            return await this.prisma.projects.findMany({
                select: {
                    id: true,
                    project_code: true,
                    status: true,
                    deadline: true,
                    description: true,
                    customer: {
                        select: {
                            name: true,
                        }
                    }
                }
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("something went wrong");
        }
    }
    async getProject(project_code) {
        try {
            return await this.prisma.projects.findUniqueOrThrow({
                where: { project_code },
                select: {
                    project_code: true,
                    status: true,
                    service_type: true,
                    deadline: true,
                    description: true,
                    current_stage: true,
                    created_by: {
                        select: {
                            full_name: true,
                            email: true,
                        },
                    },
                    balance: true,
                    created_at: true,
                    customer: {
                        select: {
                            name: true,
                            email: true,
                            address: true,
                            phone: true,
                        }
                    },
                    paid: true,
                    updated_at: true,
                },
            });
        }
        catch (e) {
            if (e instanceof client_1.PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new common_1.NotFoundException('project not exsists');
                }
            }
            else {
                throw new common_1.InternalServerErrorException("something went wrong");
            }
        }
    }
    async getfullProject(project_code) {
        try {
            return await this.prisma.projects.findUniqueOrThrow({
                where: { project_code },
                select: {
                    project_code: true,
                    status: true,
                    service_type: true,
                    deadline: true,
                    description: true,
                    current_stage: true,
                    created_by: {
                        select: {
                            full_name: true,
                            email: true,
                        },
                    },
                    balance: true,
                    created_at: true,
                    customer: {
                        select: {
                            name: true,
                            email: true,
                            address: true,
                            phone: true,
                        }
                    },
                    paid: true,
                    updated_at: true,
                    tasks: {
                        where: {
                            due_at: {
                                gte: new Date(),
                            }
                        },
                        select: {
                            title: true,
                            due_at: true,
                            quotations: {
                                where: {
                                    approval_status: {
                                        notIn: ['REJECTED', "APPROVED"]
                                    }
                                },
                                select: {
                                    created_at: true,
                                    approval_status: true,
                                }
                            },
                        }
                    }
                },
            });
        }
        catch (e) {
            if (e instanceof client_1.PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new common_1.NotFoundException('project not exsists');
                }
            }
            else {
                throw new common_1.InternalServerErrorException("something went wrong");
            }
        }
    }
    async getProjectHistory(id) {
        try {
            return await this.prisma.projects.findUnique({
                where: { id },
                select: { history: true }
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async updateProjectStatus(id, requestBody) {
        try {
            const project = await this.prisma.projects.findFirst({
                where: {
                    OR: [
                        { id },
                        { project_code: id },
                    ],
                },
                select: { id: true },
            });
            const projectStatus = await this.prisma.projects.update({
                data: { status: requestBody.status },
                where: { id: project?.id ?? id }
            });
            this.eventsGateway.emit("project_status:updated");
            return projectStatus;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("something went wrong");
        }
    }
    async incrementProjectCurrentStage(id) {
        try {
            await this.prisma.projects.update({
                where: { id },
                data: {
                    current_stage: {
                        increment: 1
                    }
                }
            });
            this.eventsGateway.emit("project_stage:updated");
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, events_gateway_1.EventsGateway])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map