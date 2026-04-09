import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './DTO/loginDto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { RegisterDto } from './DTO/registerDto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import * as dotenv from 'dotenv';

const saltOrRounds = 10

@Injectable()
export class AuthService {
    private readonly emailTransporter;
    constructor( private readonly prisma: PrismaService ) {
        this.emailTransporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_EMAIL_PASSWORD
            }

        });
    }

    async logIn( {email, password}: LoginDto) {
        try {
            const user = await this.prisma.users.findUniqueOrThrow(
                {
                    where: {email: email}
                }
            )

            if( user.password_hash === await bcrypt.hash(password,saltOrRounds)) {
                throw new HttpException('authentication success', HttpStatus.OK)
            }
            else {
                throw new HttpException('authentication failed', HttpStatus.UNAUTHORIZED)
            }
        }
        catch(e) {
            if( e instanceof PrismaClientKnownRequestError) {
                if(e.code == 'P2025') {
                    throw new NotFoundException('customer not exsists')
                }
            }
            else {
                throw new InternalServerErrorException("something went wrong");
            }
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
            this.prisma.users.update(
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

        await this.emailTransporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'OTP for password resetting',
        text: `Your OTP is ${OTP}`,
        html: `<p>Your OTP is <strong>${OTP}</strong></p>`,
      });

        }
        catch(e) {
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
