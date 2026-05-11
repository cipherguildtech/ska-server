import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { request } from 'http';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

@Get('task/details/:id')
async getTaskSingle(@Param('id') id: string) {
  console.log(id);
  return await this.tasksService.getTaskSingle(id);
}

  @Post('save_files/:id')
  async saveTaskFiles(@Param('id') id: string, @Body() requestBody: {images: string[]}) {
    await this.tasksService.saveTaskFiles(id, requestBody.images);
  }

  @Post('accept_or_reject')
  async acceptOrReject(@Body() requestBody) {
    await this.tasksService.acceptOrReject(requestBody.task_id, requestBody.action, requestBody.phone, requestBody.reason);
  }
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

    @Get('all_by_assigned_to/:assigned_to')
  getAllByAssignedTo(@Param('assigned_to')  assigned_to :string ) {
    return this.tasksService.getAllAssignedTo(assigned_to);
  }

  @Get('count/:dept/:assigned_to')
  getCount(@Param('dept') dept: string, @Param('assigned_to') assigned_to: string) {
    return this.tasksService.getCount(dept, assigned_to);
  }
  @Put('update_notes/:id')
  updateNotes(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.updateNotes(id, body);
  }

  @Put('update_status/:id/:status/:completed_at')
  updateStatus(@Param('id') id: string, @Param('status') status: string, @Param('completed_at') completed_at: string, @Body() requestBody) {
    return this.tasksService.updateStatus(id, status, completed_at);
  }

  @Get('all_project/:project_id')
  getAllByProjectId(@Param('project_id')  project_id :string ) {
    return this.tasksService.getAllByProjectId(project_id);
  }

  @Get('all_assigned_by/:assigned_by')
  getAllByAssignedBy(@Param('assigned_by')  assigned_by :string ) {
    return this.tasksService.getAllAssignedBy(assigned_by);
  }
  @Get('all_by_department/:department')
  getAllByDepartment(@Param('department')  department :string ) {
    return this.tasksService.getAllByDept(department);
  }
  @Get('all_by_title/:title')
  getAllByTitle(@Param('title')  title :string ) {
    return this.tasksService.getAllByTitle(title);
  }
  @Get('all_by_status/:status')
  getAllByStatus(@Param('status')  status :string ) {
    return this.tasksService.getAllByStatus(status);
  }


  @Get('dashboard/hr')
  getHrDashboard(){
    console.log('entered');
    return this.tasksService.getHrDashboard();
  }

 /* @Get('task_assign')
  taskAssign(){
    return this.tasksService.taskAssign();
  } */

   @Get('taskboard')
  taskboard(){
    return this.tasksService.taskboard();
  }

  @Get('teams')
  teams(){
    return this.tasksService.teams();
  }
  @Get('elaborate_teams')
  elabrateTeams(){
    return this.tasksService.elabrateTeams();
  }

  //get single task by id;
@Get('single/:id') 
async getTask(@Param('id') id: string) {
  return await this.tasksService.getTask(id);
}


  
}
