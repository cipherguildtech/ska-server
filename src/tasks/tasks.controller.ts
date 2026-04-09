import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }
//GET ALL TASKS
  @Get('all')
  getAllTasks() {
    return this.tasksService.getAll();
  }
// CREATE TASK
  @Post('create')
  createTasks(@Body() body: any) {
    return this.tasksService.createTasks(body);
  }
//UPDATE TASK
  @Put('update/:id')
  Update(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.updateTasks(id, body);
  }
//DELETE TASK BY ID
  @Delete('delete/:id')
  Delete(@Param('id') id: string) {
    return this.tasksService.deleteTasks(id);
  }

  
  // @Get('all_project/:project_id')
  // getAllByProjectId(@Param('project_id')  project_id :string ) {
  //   return this.tasksService.getAllByProjectId(project_id);
  // }
  // @Get('all/:assigned_to')
  // getAllByAssignedTo(@Param('assigned_to')  assigned_to :string ) {
  //   return this.tasksService.getAll();
  // }
  // @Get('all/:assigned_by')
  // getAllByAssignedBy(@Param('assigned_by')  assigned_by :string ) {
  //   return this.tasksService.getAll();
  // }
  // @Get('all/:department')
  // getAllByDepartment(@Param('department')  department :string ) {
  //   return this.tasksService.getAll();
  // }
  // @Get('all/:title')
  // getAllByTitle(@Param('title')  title :string ) {
  //   return this.tasksService.getAll();
  // }
  // @Get('all/:status')
  // getAllByStatus(@Param('status')  status :string ) {
  //   return this.tasksService.getAll();
  // }

}