import { Injectable, InternalServerErrorException, ServiceUnavailableException, Body } from '@nestjs/common';
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
  constructor(private prisma: PrismaService) { }

  //GET ALL TASKS
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
          due_at: true,
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
 
  //CREATE TASK
  async createTasks(body: any) {
    const tasks = await this.prisma.tasks.create(
      {
        data: {
          project_id: body.project_id,
          assigned_to: body.assigned_to,
          assigned_by: body.assigned_by,
          department: body.department,
          title: body.title,
          notes: body.notes,
          status: body.status,
          file: body.file,
          history: body.history,
          due_at: body.due_at,
        }
      }
    );

    return tasks;
  }

  //UPDATE TASK BY ID
  async updateTasks(id: string, body: any) {
    const existing = await this.prisma.tasks.findUnique({
      where: {
        id
      }
    });
    if (!existing) return "Task not available";
    const data = body.completed_at ? {
      assigned_to: body.assigned_to,
      assigned_by: body.assigned_by,
      notes: body.notes,
      status: body.status,
      file: body.file,
      history: body.history,
      due_at: body.due_at,
      completed_at: body.completed_at,
    } : {
      assigned_to: body.assigned_to,
      assigned_by: body.assigned_by,
      notes: body.notes,
      status: body.status,
      file: body.file,
      history: body.history,
      due_at: body.due_at,

    };
    const tasks = await this.prisma.tasks.update(
      {
        where: {
          id
        },
        data
      }
    );

    return tasks;
  }

  //DELETE TASK BY ID 
  async deleteTasks(id: string) {
    const existing = await this.prisma.tasks.findUnique({
      where: {
        id
      }
    });
    if (!existing) return "Task not available";
    
    const tasks = await this.prisma.tasks.delete(
      {
        where: {
          id
        },
         
      }
    );

    return tasks;
  }

//GET ALL TASKS BY ASSIGNED TO
  async getAllAssignedTo(assigned_to: string) {
    try {
      return await this.prisma.tasks.findMany({
        where: {
          assigned_to
        },
        include:{
          assignee:true,
          assigner:true,
          project:true
        }
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

  //   async getAllByProjectId(project_id:string) {
  //     try {
  //       return await this.prisma.tasks.findMany({
  //         where:{
  // project_id
  //         },
  //         select: {
  //           id: true,
  //           project_id: true,
  //           assigned_to: true,
  //           assigned_by: true,
  //           department: true,
  //           title: true,
  //           notes: true,
  //           status: true,
  //           file: true,
  //           history: true,
  //           assignee: {
  //             select: {
  //               id: true,
  //               full_name: true,
  //               email: true,
  //               phone: true,
  //               role: true,
  //               department: true,
  //               is_active: true,
  //             },
  //           },
  //           assigner: {
  //             select: {
  //               id: true,
  //               full_name: true,
  //               email: true,
  //               phone: true,
  //               role: true,
  //               department: true,
  //               is_active: true,
  //             },
  //           },
  //           project: {
  //             select: {
  //               id: true,
  //               project_code: true,
  //               customer_id: true,
  //               service_type: true,
  //               description: true,
  //               status: true,
  //               current_stage: true,
  //               paid: true,
  //               balance: true,
  //             },
  //           },
  //         },
  //       });
  //     } catch (error) {
  //       if (isDbHourlyConnectionLimitError(error)) {
  //         throw new ServiceUnavailableException(
  //           'Database connection quota is temporarily exhausted. Please retry after the provider quota window resets.',
  //         );
  //       }

  //       if (error instanceof RangeError && error.message === 'Invalid time value') {
  //         throw new InternalServerErrorException(
  //           'Invalid DATETIME value found in database rows. Clean invalid datetime values (for example 0000-00-00 00:00:00) and retry.',
  //         );
  //       }
  //       throw error;
  //     }
  //   }
}
