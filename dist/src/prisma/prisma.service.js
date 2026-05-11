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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
function addDefaultPoolParams(databaseUrl) {
    try {
        const url = new URL(databaseUrl);
        if (!url.searchParams.has('connectionLimit')) {
            url.searchParams.set('connectionLimit', '1');
        }
        if (!url.searchParams.has('minimumIdle')) {
            url.searchParams.set('minimumIdle', '1');
        }
        if (!url.searchParams.has('acquireTimeout')) {
            url.searchParams.set('acquireTimeout', '5000');
        }
        return url.toString();
    }
    catch {
        return databaseUrl;
    }
}
function isHourlyConnectionQuotaError(error) {
    const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
    return message.includes('max_connections_per_hour') || message.includes('no: 1226');
}
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    logger = new common_1.Logger(PrismaService_1.name);
    constructor() {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl?.trim()) {
            throw new Error('DATABASE_URL is required to initialize Prisma. Set it in your environment before starting the app.');
        }
        const logger = new common_1.Logger(PrismaService_1.name);
        const normalizedDatabaseUrl = addDefaultPoolParams(databaseUrl);
        const adapter = new adapter_pg_1.PrismaPg(normalizedDatabaseUrl, {
            onConnectionError: (err) => {
                if (err.message.includes('max_connections_per_hour') || err.message.includes('no: 1226')) {
                    logger.error("Database user connection quota exceeded (MariaDB error 1226). Wait for quota reset or increase the DB plan limits.");
                }
            },
        });
        super({ adapter });
    }
    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Successfully connected to the database');
        }
        catch (error) {
            if (isHourlyConnectionQuotaError(error)) {
                this.logger.error('Database connection quota is exhausted (MariaDB 1226). Application started in degraded mode until quota resets.');
                return;
            }
            this.logger.error('Failed to connect to the database');
            throw error;
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Disconnected from the database');
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map