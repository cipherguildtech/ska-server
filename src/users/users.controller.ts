import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('tasks/:phone')
    async getUserTasksDetail(@Param('phone') phone: string) {
        return await this.usersService.getUserTasksDetail(phone);
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
}
