import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Get(':email')
    async getUser(@Param() email: string) {
        return await this.usersService.getUser(email);
    }
}
