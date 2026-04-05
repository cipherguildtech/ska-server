import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async getAll()  {
    const tasks=await this.prisma.tasks.findMany
    (
      {
        select:{
          project:true,
          assignee:true,
          assigner:true,

        }
      }
    )
    return tasks;
  }
}
