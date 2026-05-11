import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('tasks/single/:phone')
    async getUserTasksDetail(@Param('phone') phone: string) {
        return await this.usersService.getUserTasksDetail(phone);
    }

    @Get('basic_details')
    async getUsersBasicDetails() {
        return await this.usersService.getUsersBasicDetails();
    }

    @Put('user/:phone/activate_or_deactivate/:action')
    async activateOrDeactivate(@Param('phone') phone: string, @Param('action') action: boolean) {
        return await this.usersService.activateOrDeactivate(phone, action);
    }

    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Get('detail/:phone')
    async getUser(@Param('phone') phone: string) {
        return await this.usersService.getUser(phone);
    }

    @Put(':phone')
    async updateUser(@Param('phone') phone: string, @Body() requestBody: {name: string, email: string}) {
        return await this.usersService.updateUser(phone, requestBody)
    }

    @Get('tasks')
    async getUserTasks() {
        return await this.usersService.getUserTasks();
    }

    /*@Get('projects_and_tasks/:phone')
    async getUserProjectsAndTasks(@Param('phone') phone: string) {
        return await this.usersService.getUserProjectsAndTasks(phone);
    }*/

    @Get('team/task_type_count/:phone')
    async getUserTaskTypeCount(@Param('phone') phone: string) {
        return await this.usersService.getUserTaskTypeCounts(phone);
    }

    @Get('team/completed_tasks/:phone')
    async getUserCompletedTasks(@Param('phone') phone: string) {
        return await this.usersService.getUserCompletedTasks(phone);
    }

    @Get('team/incomplete_tasks/:phone')
    async getUserInCompleteTasks(@Param('phone') phone: string) {
        return await this.usersService.getUserIncompleteTasks(phone);
    }

    @Get('team/active_tasks/:phone')
    async getUserActiveTasks(@Param('phone') phone: string) {
        return await this.usersService.getUserActiveTasks(phone);
    }
}
