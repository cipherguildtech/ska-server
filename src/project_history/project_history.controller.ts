import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProjectHistoryService } from './project_history.service';
 

@Controller('project-history')
export class ProjectHistoryController {
  constructor(private readonly projectHistoryService: ProjectHistoryService) { }
  @Get('all')
  getAll(){
    return this.projectHistoryService.getAll();
  }
  @Post('create')
  /*create(@Body() data: any) {
    return this.projectHistoryService.create(data);
  }*/
  @Put('update/:id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.projectHistoryService.update(id, data);
  }
}