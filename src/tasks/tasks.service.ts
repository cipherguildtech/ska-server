import { Injectable, InternalServerErrorException, ServiceUnavailableException, Body, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Approval_status, Project_status, Task_status, Users_dept } from '@prisma/client';
import { log } from 'console';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';


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

  async acceptOrReject(task_id: string, action: string, phone: string, reason: string | null) {
    if(action == "accept") {
      try {
        await this.updateStatus(task_id, Task_status.COMPLETED, new Date().toString());

        const task = await this.prisma.tasks.findUnique(
          {
            where: {
              id: task_id
            },
            select: {
              project_id: true,
              work_details:true,
            }
          }
        );

        const project_history = await this.prisma.projectHistory.create(
          {
            data: {
              changed_by: phone,
              project_id: task!.project_id,
              task_id: task_id,
              task_old_status: Task_status.REVIEW,
              task_new_status: Task_status.COMPLETED,
              note: "accepted",
              detail:{
                "work detail": task!.work_details,
                "reason": reason
              },
              changed_at: new Date(),
            }
          }
        )
        return project_history;
      }
      catch(e) {
        console.log(e);
        throw new InternalServerErrorException('something went wrong');
      }
    }
    else {
      try {
        await this.updateStatus(task_id, Task_status.PENDING, new Date().toString());

        const task = await this.prisma.tasks.findUnique(
          {
            where: {
              id: task_id
            },
            select: {
              project_id: true,
              work_details:true,
            }
          }
        );

        const project_history = await this.prisma.projectHistory.create(
          {
            data: {
              changed_by: phone,
              project_id: task!.project_id,
              task_id: task_id,
              task_old_status: Task_status.REVIEW,
              task_new_status: Task_status.PENDING,
              note: "rejected",
              detail:{
                "work detail": task!.work_details,
                "reason": reason
              },
              changed_at: new Date(),
            }
          }
        )
        return project_history;

      }
      catch(e) {
        console.log(e);
        throw new InternalServerErrorException("something went wrong");
      }
    }
  }
  async getTask(id: string) {
    try {
      return await this.prisma.tasks.findUniqueOrThrow(
        {
          where: {id},
          include: {
            project: {
              select: {
                id: true,
                customer_email: true,
                project_code: true,
                balance: true,
                created_at: true,
                updated_at: true,
                created_user_email: true,
                current_stage: true,
                deadline: true,
                service_type: true,
                description: true,
                status: true,
              }
            }
          }
        }
      )
    }
    catch(e) {
      if( e instanceof PrismaClientKnownRequestError) {
        if(e.code == 'P2025') {
          throw new NotFoundException('task not exists')
        }
      }
      else {
        console.log(e);
        throw new InternalServerErrorException("something went wrong");
      }
    }
  } 

  //GET ALL TASKS
  async getAll() {
    try {
      return await this.prisma.tasks.findMany({
        include: {
          assignee: true,
          assigner: true,
          project: true
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
          files: body.files,
          history: body.history,
          due_at: new Date(body.due_at),
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

        include: {
          assignee: true,
          assigner: true,
          project: true
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


  async getCount(dept: string, assigned_to: string) {
    try {
      if (dept.toUpperCase() != Users_dept.CNC_CUTTING && dept.toUpperCase() != Users_dept.DESIGNING && dept.toUpperCase() != Users_dept.ERRACTON
        && dept.toUpperCase() != Users_dept.FITTING && dept.toUpperCase() != Users_dept.LASER && dept.toUpperCase() != Users_dept.LETTER_MAKING
        && dept.toUpperCase() != Users_dept.MARKETTING && dept.toUpperCase() != Users_dept.ORDER && dept.toUpperCase() != Users_dept.PRINTING
        && dept.toUpperCase() != Users_dept.SITE_VISITING && dept.toUpperCase() != Users_dept.TRANSPORT && dept.toUpperCase() != Users_dept.WELDING) {
        return ("Invalid department");
      }

      const totalTasks = await this.prisma.tasks.count({
        where: {
          department: dept.toUpperCase() as Users_dept,
          assigned_to
        },
      });
      const pending = await this.prisma.tasks.count({
        where: {
          department: dept.toUpperCase() as Users_dept,
          assigned_to,
          status: 'PENDING',
        },
      });
      const inProgress = await this.prisma.tasks.count({
        where: {
          department: dept.toUpperCase() as Users_dept,
          assigned_to,
          status: 'IN_PROGRESS',
        },
      });
      const completed = await this.prisma.tasks.count({
        where: {
          department: dept.toUpperCase() as Users_dept,
          assigned_to,
          status: 'COMPLETED',
        },
      });

      const delayed = await this.prisma.tasks.count({
        where: {
          department: dept.toUpperCase() as Users_dept,
          assigned_to,
          due_at: {
            //if completed_at is null and due_at is less than current date then it is delayed
            lt: new Date(),
          },
          completed_at: null,
          status: {
            not: 'COMPLETED',
          },

        },
      });



      return { totalTasks, pending, inProgress, completed, delayed, inCompleted: totalTasks - completed };

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


  async updateNotes(id: string, body: any) {
    const existing = await this.prisma.tasks.findUnique({
      where: {
        id
      }
    });
    if (!existing) return "Task not available";
    const
      data = body.files ? {
        notes: body.notes,
        history: body.history,
        files: body.files
      } : {
        notes: body.notes,
        history: body.history
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


  async updateStatus(id: string, status: string, completed_at: string) {
    const existing = await this.prisma.tasks.findUnique({
      where: {
        id
      }
    });

    if (!existing) return "Task not available";

    if (status.toUpperCase() != Task_status.PENDING && status.toUpperCase() != Task_status.IN_PROGRESS && status.toUpperCase() != Task_status.COMPLETED && status.toUpperCase() != Task_status.CANCELLED) {
      return "Invalid status";
    }
    const data = completed_at && completed_at !== 'null' ? {
      status: status.toUpperCase() as Task_status,
      completed_at: new Date(completed_at)
    } : {
      status: status.toUpperCase() as Task_status,
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


  async getAllByProjectId(project_id: string) {
    try {
      return await this.prisma.tasks.findMany({
        where: {
          project_id
        },
        include: {
          assignee: true,
          assigner: true,
          project: true
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

  //GET ALL TASKS BY ASSIGNED BY
  async getAllAssignedBy(assigned_by: string) {


    try {
      return await this.prisma.tasks.findMany({
        where: {
          assigned_by
        },

        include: {
          assignee: true,
          assigner: true,
          project: true
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

  //GET ALL TASKS
  async getAllByDept(dept: string) {
    try {
      return await this.prisma.tasks.findMany({
        where: {
          department: dept.toLowerCase() as Users_dept
        },
        include: {
          assignee: true,
          assigner: true,
          project: true
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

  async getAllByTitle(title: string) {
    try {
      return await this.prisma.tasks.findMany({
        where: {
          title
        },
        include: {
          assignee: true,
          assigner: true,
          project: true
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

  async getAllByStatus(status: string) {
    try {
      return await this.prisma.tasks.findMany({
        where: {
          status: status.toUpperCase() as Task_status
        },
        include: {
          assignee: true,
          assigner: true,
          project: true
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


  async getHrDashboard() {
    const incompleteTasks = await this.prisma.tasks.count(
      {
        where: {
          status: {
            in: [Task_status.IN_PROGRESS, Task_status.PENDING]
          }
        }
      }
    )

    const pendingTasks = await this.prisma.tasks.count
      ({
        where: {
          status: Task_status.PENDING
        }
      });
    const inProgressTasks = await this.prisma.tasks.count
      ({
        where: {
          status: Task_status.IN_PROGRESS
        }
      });
    const completedTasks = await this.prisma.tasks.count
      ({
        where: {
          status: Task_status.COMPLETED
        }
      });
    const cancelledTasks = await this.prisma.tasks.count
      ({
        where: {
          status: Task_status.CANCELLED
        }
      });
    const reviewTasks = await this.prisma.tasks.count
      ({
        where: {
          status: Task_status.REVIEW
        }
      });

    const draftQuotation = await this.prisma.quotations.count({
      where: {
        approval_status: Approval_status.DRAFT
      }
    });
    const sentQuotation = await this.prisma.quotations.count({
      where: {
        approval_status: Approval_status.SENT
      }
    });
    const approvedQuotation = await this.prisma.quotations.count({
      where: {
        approval_status: Approval_status.APPROVED
      }
    });
    const rejectedQuotation = await this.prisma.quotations.count({
      where: {
        approval_status: Approval_status.REJECTED
      }
    });
    const delayedTasks = await this.prisma.tasks.count({
      where: {

        due_at: {
          //if completed_at is null and due_at is less than current date then it is delayed
          lt: new Date(),
        },
        completed_at: null,
        status: {
          not: 'COMPLETED',
        },

      },
    });
    const completedProjects = await this.prisma.projects.count({
      where: {
        status: Project_status.COMPLETED
      }
    });
    const notCompletedProjects = await this.prisma.projects.count({
      where: {
        status: {
          notIn: [Project_status.COMPLETED, Project_status.CANCELLED],
        },
      },
    });

    const projectWithoutAnyTask = await this.prisma.projects.count({
      where: {
        OR: [
          {
            tasks: {
              none: {}
            }
          },
          {
            tasks: {
              every: {
                status: {
                  in: [Task_status.CANCELLED, Task_status.COMPLETED, Task_status.REVIEW]
                }
              }
            }
          }
        ]
        }
      });

    const taskInProgress = await this.prisma.tasks.findMany
      ({
        where: {
          status: Task_status.IN_PROGRESS
        },
        select: {
          id: true,
          project_id: true,
          department: true,
          title: true,
          notes: true,
          status: true,
        }
      });
    const taskForReview = await this.prisma.tasks.findMany
      ({
        where: {
          status: Task_status.REVIEW
        },
        select: {
          id: true,
          project_id: true,
          department: true,
          title: true,
          notes: true,
          status: true,
        }
      });

    // teams = [
    //         {"name": "Designing", "tasks": 2},
    //         {"name": "Sales", "tasks": 4},
    //         {"name": "Marketing", "tasks": 3},
    //       ];

    const teamsData = await this.prisma.tasks.groupBy({
      where: {
        status: {
          notIn: ['CANCELLED', 'COMPLETED'],
        },
      },
      by: ['department'],
      _count: {
        department: true,
      },
    });
    const teams = teamsData.map((item) => ({
      name: item.department,
      tasks: item._count.department,
    }));
    const tasksToAssign = await this.prisma.projects.findMany({
      where: {
        OR: [
          {
            tasks: {
              none: {}
            }
          },
          {
            tasks: {
              every: {
                status: {
                  in: [Task_status.CANCELLED, Task_status.COMPLETED, Task_status.REVIEW]
                }
              }
            }
          }
        ]
      },
      select: {
        id: true,
        project_code: true,
        description: true,
        service_type: true
      }
    });

    return {
      pendingTasks,
      inProgressTasks,
      completedTasks,
      cancelledTasks,
      reviewTasks,
      delayedTasks,
      draftQuotation,
      sentQuotation,
      approvedQuotation,
      rejectedQuotation,
      completedProjects,
      notCompletedProjects,
      projectWithoutAnyTask,
      taskInProgress,
      taskForReview,
      teams,
      tasksToAssign,
      incompleteTasks
    }
  }

  async taskAssign() {
    const tasks = await this.prisma.tasks.findMany({
      select: {
        title: true,
        department: true,
        status: true,
        assignee: {
          select: {
            full_name: true,
            email: true,
            role: true,
            department: true,
          }
        },
        assigner: {
          select: {
            full_name: true,
            email: true,
            role: true,
            department: true,
          }
        },
      }
    });
    return tasks;
  }


  async taskboard() {
    const taskInProgress = await this.prisma.tasks.findMany
      ({
        where: {
          status: Task_status.IN_PROGRESS
        },
        select: {
          id: true,
          project_id: true,
          department: true,
          title: true,
          notes: true,
          status: true,
        }
      });
    const taskForReview = await this.prisma.tasks.findMany
      ({
        where: {
          status: Task_status.REVIEW
        },
        select: {
          id: true,
          project_id: true,
          department: true,
          title: true,
          notes: true,
          status: true,
        }
      });
    const tasksToAssign = await this.prisma.projects.findMany({
      where: {
        tasks: {
          none: {}
        }
      },
      select: {
        id: true,
        project_code: true,
        description: true,
        service_type: true
      }
    });
    return {
      taskInProgress, 
      taskForReview,
      tasksToAssign
    }
  }

async teams() {
  const allDepartments = Users_dept ? Object.values(Users_dept) : []; 

  const teamsData = await this.prisma.tasks.groupBy({
    where: {
      status: {
        notIn: ['CANCELLED', 'COMPLETED'],
      },
    },
    by: ['department'],
    _count: {
      department: true,
    },
  });

  const map = new Map(
    teamsData.map((item) => [item.department, item._count.department])
  );

  return allDepartments.map((dept) => ({
    name: dept,
    tasks: map.get(dept as Users_dept) || 0,
  }));
}
async elabrateTeams() {
  const allUsers = await this.prisma.users.findMany({
    select: {
      id: true,
      full_name: true,
      department: true,
    },
  });

  const allDepartments = Users_dept ? Object.values(Users_dept) : [];

  const tasks = await this.prisma.tasks.findMany({
    where: {
      status: {
        notIn: ['CANCELLED', 'COMPLETED'],
      },
    },
    select: {
      department: true,
      assigner: {
        select: {
          id: true,
          full_name: true,
        },
      },
    },
  });

  // ✅ Types
  type UserEntry = {
    userId: string;
    name: string;
    count: number;
  };

  type DeptEntry = {
    name: string;
    tasks: number;
    users: Record<string, UserEntry>;
  };

  const deptMap: Record<string, DeptEntry> = {};

  // 🔹 Step 1: Initialize departments
  for (const dept of allDepartments) {
    if (!dept) continue;

    deptMap[dept] = {
      name: dept,
      tasks: 0,
      users: {},
    };
  }

  // 🔹 Step 2: Add all users (count = 0)
  for (const user of allUsers) {
    const dept = user.department;

    if (!dept || !deptMap[dept]) continue;

    deptMap[dept].users[user.id] = {
      userId: user.id,
      name: user.full_name,
      count: 0,
    };
  }

  // 🔹 Step 3: Aggregate tasks
  for (const task of tasks) {
    const dept = task.department;
    const user = task.assigner;

    if (!dept || !deptMap[dept]) continue;

    deptMap[dept].tasks += 1;

    if (user) {
      // create user if missing
      if (!deptMap[dept].users[user.id]) {
        deptMap[dept].users[user.id] = {
          userId: user.id,
          name: user.full_name,
          count: 0,
        };
      }

      deptMap[dept].users[user.id].count += 1;
    }
  }

  // 🔹 Step 4: Convert users object → array
  const result = Object.values(deptMap).map((dept) => ({
    name: dept.name,
    tasks: dept.tasks,
    users: Object.values(dept.users),
  }));
  return result;
 }
}

