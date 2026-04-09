import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/loginDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async logIn(@Body() requestBody: LoginDto) {
        return await this.authService.logIn(requestBody);
    }

    @Post('register')
    async register(@Body() requestBody: {email: string, password: string}) {
    }
}
