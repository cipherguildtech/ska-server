import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import {PrismaPg} from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

function addDefaultPoolParams(databaseUrl: string): string {
  try {
    const url = new URL(databaseUrl);

    // Shared-hosting databases commonly enforce strict connection quotas.
    // Keep the pool intentionally small unless explicitly overridden in DATABASE_URL.
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
  } catch {
    return databaseUrl;
  }
}

function isHourlyConnectionQuotaError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return message.includes('max_connections_per_hour') || message.includes('no: 1226');
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl?.trim()) {
      throw new Error(
        'DATABASE_URL is required to initialize Prisma. Set it in your environment before starting the app.',
      );
    }

    const logger = new Logger(PrismaService.name);
    const normalizedDatabaseUrl = addDefaultPoolParams(databaseUrl);

    const adapter = new PrismaPg(normalizedDatabaseUrl, {
      onConnectionError: (err) => {
        if (err.message.includes('max_connections_per_hour') || err.message.includes('no: 1226')) {
          logger.error(
            "Database user connection quota exceeded (MariaDB error 1226). Wait for quota reset or increase the DB plan limits.",
          );
        }
      },
    });

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      if (isHourlyConnectionQuotaError(error)) {
        this.logger.error(
          'Database connection quota is exhausted (MariaDB 1226). Application started in degraded mode until quota resets.',
        );
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
}
