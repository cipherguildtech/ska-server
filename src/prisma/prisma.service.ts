import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    constructor() {
        const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
        super({ adapter });
    }
    async onModuleInit() {
        await this.$connect();
        console.log('db connected');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log("db disconnected");
    }
}