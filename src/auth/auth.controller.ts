import { Body, Controller, HttpException, Post, Put, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/loginDto';
import { RegisterDto } from './DTO/registerDto';
import { VerifyOtpDto } from './DTO/verifyOtpDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async logIn(@Body() requestBody: LoginDto) {
        return await this.authService.logIn(requestBody);
    }

    @Post('register')
    async register(@Body() requestBody: RegisterDto) {
        return await this.authService.register(requestBody);
    }

    @Put('reset_password')
    async resetPassword(@Body() requestBody: LoginDto) {
        return await this.authService.resetPassword(requestBody);
    }

    @Post('send_otp')
    async sendOtp(@Body() requestBody: {email: string}) {
        return await this.authService.sendOTP(requestBody.email);
    }

    @Post('verify_otp')
    async verifyOtp(@Body() requestBody: VerifyOtpDto) {
        return await this.authService.verifyOTP(requestBody);
    }
}
