import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Get(':phone')
    async getUser(@Param('phone') phone: string) {
        return await this.usersService.getUser(phone);
    }

    @Put(':phone')
    async updateUser(@Param('phone') phone: string, @Body() requestBody: {email: string}) {
        return await this.usersService.updateUser(phone, requestBody)
    }
}
