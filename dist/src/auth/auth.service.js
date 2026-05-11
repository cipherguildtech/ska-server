"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client/runtime/client");
const bcrypt = __importStar(require("bcrypt"));
const nodemailer = __importStar(require("nodemailer"));
const crypto_1 = require("crypto");
const events_gateway_1 = require("../gateway/events.gateway");
const saltOrRounds = 10;
let AuthService = class AuthService {
    prisma;
    eventsGateway;
    emailTransporter;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
        this.emailTransporter = nodemailer.createTransport({
            host: process.env.SENDER_EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_APP_PASSWORD
            }
        });
    }
    async logIn({ phone, password }) {
        try {
            const user = await this.prisma.users.findUniqueOrThrow({
                where: { phone }
            });
            if (!(await bcrypt.compare(password, user.password_hash))) {
                throw new common_1.UnauthorizedException('login failed');
            }
            else {
                return {
                    message: "login success",
                    "user": {
                        "name": user.full_name,
                        "role": user.role,
                        "phone": user.phone,
                        "department": user.department
                    }
                };
            }
        }
        catch (e) {
            console.log(e);
            if (e instanceof client_1.PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new common_1.NotFoundException('user not exists');
                }
            }
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async register(requestBody) {
        try {
            const user = await this.prisma.users.create({
                data: {
                    full_name: requestBody.full_name,
                    email: requestBody.email,
                    phone: requestBody.phone,
                    password_hash: await bcrypt.hash(requestBody.password, saltOrRounds),
                    department: requestBody.department,
                    role: requestBody.role
                },
                omit: {
                    password_hash: true,
                    otp: true,
                    otp_expiry: true,
                },
            });
            this.eventsGateway.emit("user:created");
            return user;
        }
        catch (e) {
            if (e instanceof client_1.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new common_1.ConflictException("customer with these details already exists");
                }
            }
            else {
                throw new common_1.InternalServerErrorException("something went wrong");
            }
        }
    }
    async resetPassword({ email, password }) {
        var newPassword = password;
        try {
            await this.prisma.users.update({
                data: { password_hash: await bcrypt.hash(newPassword, saltOrRounds) },
                where: { email: email }
            });
            return {
                message: "password updated"
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async sendOTP(email) {
        const OTP = (0, crypto_1.randomInt)(100000, 999999).toString();
        try {
            await this.prisma.users.update({
                data: {
                    otp: OTP,
                    otp_expiry: new Date(Date.now() + 5 * 60 * 1000)
                },
                where: {
                    email: email
                }
            });
            await this.emailTransporter.sendMail({
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'OTP for password resetting',
                text: `Your OTP is ${OTP}`,
                html: `<p>Your OTP is <strong>${OTP}</strong></p>`,
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async verifyOTP({ otp, email }) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email: email
                }
            });
            if (user !== null) {
                if (user.otp === otp) {
                    if (new Date() > user.otp_expiry) {
                        throw new common_1.HttpException('OTP expired', common_1.HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        return {
                            message: "OTP verified"
                        };
                    }
                }
                else {
                    throw new common_1.HttpException('wrong OTP', common_1.HttpStatus.UNAUTHORIZED);
                }
            }
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, events_gateway_1.EventsGateway])
], AuthService);
//# sourceMappingURL=auth.service.js.map