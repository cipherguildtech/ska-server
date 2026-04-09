import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './DTO/loginDto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { RegisterDto } from './DTO/registerDto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import * as dotenv from 'dotenv';
import { Resend } from 'resend';

const saltOrRounds = 10

@Injectable()
export class AuthService {
    constructor( private readonly prisma: PrismaService ) {}

    async logIn( {email, password}: LoginDto) {
        try {
            const user = await this.prisma.users.findUniqueOrThrow(
                {
                    where: {email: email}
                }
            )

            if( !(await bcrypt.compare(password,user.password_hash)) ) {
               throw new UnauthorizedException('login failed');
            }
            else {
                return {
                message: "login success"
               };
            }
        }
        catch(e) {
            console.log(e);
            if( e instanceof PrismaClientKnownRequestError) {
                if(e.code == 'P2025') {
                    throw new NotFoundException('user not exsists');
                }
            }
            if(e instanceof HttpException)
                {
                throw e;
            }

            throw new InternalServerErrorException('something went wrong');
        }
    }

    async register(requestBody : RegisterDto) {
        try {
            await this.prisma.users.create(
                {
                    data: {
                        full_name: requestBody.full_name,
                        email: requestBody.email,
                        phone: requestBody.phone,
                        password_hash: await bcrypt.hash(requestBody.password, saltOrRounds),
                        department: requestBody.department,
                        role: requestBody.role
                    },
                }
            )
        }
        catch(e) {
            if(e instanceof PrismaClientKnownRequestError) {
                if(e.code === 'P2002') {
                    throw new ConflictException("customer with these details already exists");
                }
            }
            else {
                throw new InternalServerErrorException("something went wrong");
            }
        }
    }


    async resetPassword({email, password}: LoginDto) 
    {
        var newPassword = password;

        try {
            await this.prisma.users.update(
                {
                    data: {password_hash: await bcrypt.hash(newPassword, saltOrRounds)},
                    where: {email: email}
                }
            );
            throw new HttpException('password updated', HttpStatus.OK)
        }
        catch(e) {
            throw new InternalServerErrorException('something went wrong');
        }
        
    }

    async sendOTP(email: string) {
        const OTP = randomInt(100000, 999999).toString();

        try {
            await this.prisma.users.update(
                {
                    data: {
                        otp: OTP,
                        otp_expiry: new Date(Date.now() + 5 * 60 * 1000)  
                    },
                    where: {
                        email: email
                    }
                }
            );
        
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send(
            {
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'OTP for resetting paassword',
                html: `<p>Your OTP is <strong>${OTP}</strong> </p> `
            }
        );

        }
        catch(e) {
            console.log(e);
            throw new InternalServerErrorException('something went wrong');
        }

    }


    async verifyOTP(otp: string, email: string) {
        try {
            const user = await this.prisma.users.findUnique(
                {
                    where: {
                        email: email
                    }
                }
            );

            if(user !== null) {
                if(user.otp === otp) {
                    if(new Date() > user.otp_expiry!) {
                        throw new HttpException('otp expired', HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        throw new HttpException('otp verified', HttpStatus.OK);
                    }
                }
                else {
                    throw new HttpException('wrong otp', HttpStatus.UNAUTHORIZED);
                }
            }
        }

        catch(e) {
            throw new InternalServerErrorException('something went wrong');
        }
    }
}
