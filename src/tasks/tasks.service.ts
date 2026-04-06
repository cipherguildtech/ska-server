import { Injectable, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function isDbHourlyConnectionLimitError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const candidate = error as {
    message?: string;
    cause?: {
      originalMessage?: string;
      cause?: string;
    };
  };

  const messages = [candidate.message, candidate.cause?.originalMessage, candidate.cause?.cause]
    .filter((value): value is string => typeof value === 'string')
    .join(' | ')
    .toLowerCase();

  return messages.includes('max_connections_per_hour') || messages.includes('no: 1226');
}

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    try {
      return await this.prisma.tasks.findMany({
        select: {
          id: true,
          project_id: true,
          assigned_to: true,
          assigned_by: true,
          department: true,
          title: true,
          notes: true,
          status: true,
          file: true,
          history: true,
          assignee: {
            select: {
              id: true,
              full_name: true,
              email: true,
              phone: true,
              role: true,
              department: true,
              is_active: true,
            },
          },
          assigner: {
            select: {
              id: true,
              full_name: true,
              email: true,
              phone: true,
              role: true,
              department: true,
              is_active: true,
            },
          },
          project: {
            select: {
              id: true,
              project_code: true,
              customer_id: true,
              service_type: true,
              description: true,
              status: true,
              current_stage: true,
              paid: true,
              balance: true,
            },
          },
        },
      });
    } catch (error) {
      if (isDbHourlyConnectionLimitError(error)) {
        throw new ServiceUnavailableException(
          'Database connection quota is temporarily exhausted. Please retry after the provider quota window resets.',
        );
      }

      if (error instanceof RangeError && error.message === 'Invalid time value') {
        throw new InternalServerErrorException(
          'Invalid DATETIME value found in database rows. Clean invalid datetime values (for example 0000-00-00 00:00:00) and retry.',
        );
      }
      throw error;
    }
  }
  async getAllByProjectId(project_id:string) {
    try {
      return await this.prisma.tasks.findMany({
        where:{
project_id
        },
        select: {
          id: true,
          project_id: true,
          assigned_to: true,
          assigned_by: true,
          department: true,
          title: true,
          notes: true,
          status: true,
          file: true,
          history: true,
          assignee: {
            select: {
              id: true,
              full_name: true,
              email: true,
              phone: true,
              role: true,
              department: true,
              is_active: true,
            },
          },
          assigner: {
            select: {
              id: true,
              full_name: true,
              email: true,
              phone: true,
              role: true,
              department: true,
              is_active: true,
            },
          },
          project: {
            select: {
              id: true,
              project_code: true,
              customer_id: true,
              service_type: true,
              description: true,
              status: true,
              current_stage: true,
              paid: true,
              balance: true,
            },
          },
        },
      });
    } catch (error) {
      if (isDbHourlyConnectionLimitError(error)) {
        throw new ServiceUnavailableException(
          'Database connection quota is temporarily exhausted. Please retry after the provider quota window resets.',
        );
      }

      if (error instanceof RangeError && error.message === 'Invalid time value') {
        throw new InternalServerErrorException(
          'Invalid DATETIME value found in database rows. Clean invalid datetime values (for example 0000-00-00 00:00:00) and retry.',
        );
      }
      throw error;
    }
  }
}
