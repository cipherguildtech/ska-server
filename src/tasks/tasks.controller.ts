import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
 

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('all')
  getAllTasks() {
    return this.tasksService.getAll();
  }

  @Get('all/:project_id')
  getAllByProjectId(@Param('project_id')  project_id :number ) {
    return this.tasksService.getAll();
  }
  @Get('all/:assigned_to')
  getAllByAssignedTo(@Param('assigned_to')  assigned_to :string ) {
    return this.tasksService.getAll();
  }
  @Get('all/:assigned_by')
  getAllByAssignedBy(@Param('assigned_by')  assigned_by :string ) {
    return this.tasksService.getAll();
  }
  @Get('all/:department')
  getAllByDepartment(@Param('department')  department :string ) {
    return this.tasksService.getAll();
  }
  @Get('all/:title')
  getAllByTitle(@Param('title')  title :string ) {
    return this.tasksService.getAll();
  }
  @Get('all/:status')
  getAllByStatus(@Param('status')  status :string ) {
    return this.tasksService.getAll();
  }

}