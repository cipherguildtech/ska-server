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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const wasm_compiler_edge_1 = require("@prisma/client/runtime/wasm-compiler-edge");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserTaskTypeCounts(phone) {
        try {
            const completedTaskCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'COMPLETED'
                    }
                },
            });
            const pendingTaskCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'PENDING'
                    }
                }
            });
            const inProgressTaskCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'IN_PROGRESS'
                    }
                }
            });
            const totalTaskCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        notIn: ['COMPLETED', 'CANCELLED', 'REVIEW']
                    }
                }
            });
            const delayedTasksCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        notIn: ['COMPLETED']
                    },
                    due_at: {
                        lt: new Date()
                    },
                }
            });
            const incompleteTaskCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        in: ['IN_PROGRESS', 'PENDING']
                    }
                }
            });
            var countData = {
                'total_task_count': totalTaskCount,
                'pending_task_count': pendingTaskCount,
                'in_progress_task_count': inProgressTaskCount,
                'completed_task_count': completedTaskCount,
                'incomplete_task_count': incompleteTaskCount,
                'delayed_task_count': delayedTasksCount,
            };
            return countData;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async getUserTasksDetail(phone) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { phone },
                select: {
                    full_name: true,
                    role: true,
                    department: true,
                    assigned_tasks: {
                        select: {
                            id: true,
                            notes_work: true,
                            assigned_by: true,
                            files: true,
                            is_quotation: true,
                            completed_at: true,
                            created_at: true,
                            description: true,
                            due_at: true,
                            notes: true,
                            status: true,
                            title: true,
                            work_details: true,
                            updated_at: true,
                            taskHistory: {
                                select: {
                                    changed_at: true,
                                    changed_by: true,
                                    detail: true,
                                    note: true,
                                    project_id: true,
                                    task_new_status: true,
                                    task_old_status: true
                                }
                            },
                            project: {
                                select: {
                                    id: true,
                                    created_at: true,
                                    updated_at: true,
                                    created_by: {
                                        select: {
                                            id: true,
                                            full_name: true,
                                            phone: true,
                                        }
                                    },
                                    balance: true,
                                    created_user_email: true,
                                    current_stage: true,
                                    customer_email: true,
                                    deadline: true,
                                    description: true,
                                    service_type: true,
                                    project_code: true,
                                    status: true,
                                    paid: true,
                                }
                            },
                            quotations: {
                                select: {
                                    pdf_url: true,
                                    advance_paid: true,
                                    amount: true,
                                    approval_status: true,
                                    approved_at: true,
                                    created_at: true,
                                    payments: {
                                        select: {
                                            amount: true,
                                            created_at: true,
                                            paid_at: true,
                                            type: true,
                                            reference: true
                                        }
                                    },
                                    updated_at: true,
                                },
                            },
                        }
                    },
                }
            });
            const completedTasksCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'COMPLETED'
                    }
                },
            });
            const cancelledTasksCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'CANCELLED'
                    }
                }
            });
            const pendingTasksCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'PENDING'
                    }
                }
            });
            const inProgressTasksCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'IN_PROGRESS'
                    }
                }
            });
            const reviewTasksCount = await this.prisma.tasks.count({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'REVIEW'
                    }
                }
            });
            return {
                user,
                "completed_tasks_count": completedTasksCount,
                "cancelled_tasks_count": cancelledTasksCount,
                "pending_tasks_count": pendingTasksCount,
                "inprogress_tasks_count": inProgressTasksCount,
                "review_tasks_count": reviewTasksCount,
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async getUsers() {
        try {
            return await this.prisma.users.findMany({
                omit: {
                    id: true,
                    otp: true,
                    otp_expiry: true,
                    password_hash: true,
                },
                include: {
                    history_logs: true,
                    assigned_tasks: true,
                    created_tasks: true
                }
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async getUserTasks() {
        try {
            const usersWithTasks = await this.prisma.users.findMany({
                where: {
                    role: {
                        in: ['SALES', 'TEAM']
                    }
                },
                select: {
                    phone: true,
                    full_name: true,
                    role: true,
                    department: true,
                    id: true,
                    _count: {
                        select: {
                            assigned_tasks: {
                                where: {
                                    status: {
                                        in: ['IN_PROGRESS', 'PENDING']
                                    }
                                }
                            }
                        }
                    }
                }
            });
            return usersWithTasks;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async getUser(phone) {
        try {
            return await this.prisma.users.findUniqueOrThrow({
                where: {
                    phone
                },
                omit: {
                    id: true,
                    otp: true,
                    otp_expiry: true,
                    password_hash: true,
                    created_at: true,
                },
                include: {
                    history_logs: true,
                    assigned_tasks: true,
                    created_tasks: true
                }
            });
        }
        catch (e) {
            if (e instanceof wasm_compiler_edge_1.PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new common_1.NotFoundException('user not exsists');
                }
            }
            else {
                console.log(e);
                throw new common_1.InternalServerErrorException("something went wrong");
            }
        }
    }
    async updateUser(phone, { name, email }) {
        try {
            return this.prisma.users.update({
                where: { phone: phone },
                data: {
                    full_name: name,
                    email: email
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async getUserCompletedTasks(phone) {
        try {
            const userCompletedTasks = await this.prisma.tasks.findMany({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        equals: 'COMPLETED'
                    }
                },
                select: {
                    project: {
                        select: {
                            project_code: true,
                        }
                    },
                    title: true,
                    description: true,
                    due_at: true,
                    completed_at: true,
                    status: true,
                    id: true
                }
            });
            return userCompletedTasks;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async getUserIncompleteTasks(phone) {
        try {
            const userInCompleteTasks = await this.prisma.tasks.findMany({
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        in: ['PENDING', 'IN_PROGRESS']
                    }
                },
                select: {
                    project: {
                        select: {
                            project_code: true,
                        },
                    },
                    title: true,
                    description: true,
                    due_at: true,
                    status: true,
                    id: true,
                }
            });
            return userInCompleteTasks;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async getUserActiveTasks(phone) {
        try {
            const userActiveTasks = await this.prisma.tasks.findMany({
                take: 3,
                where: {
                    assignee: {
                        phone
                    },
                    status: {
                        in: ['PENDING', 'IN_PROGRESS']
                    }
                },
                orderBy: {
                    due_at: 'desc'
                },
                select: {
                    project: {
                        select: {
                            project_code: true,
                        }
                    },
                    title: true,
                    status: true,
                    due_at: true,
                    id: true,
                }
            });
            return userActiveTasks;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map