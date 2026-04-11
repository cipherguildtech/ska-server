import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './DTO/loginDto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { RegisterDto } from './DTO/registerDto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomInt, Verify } from 'crypto';
import { VerifyOtpDto } from './DTO/verifyOtpDto';

const saltOrRounds = 10

@Injectable()
export class AuthService {
    private readonly emailTransporter;
    constructor( private readonly prisma: PrismaService ) {
        this.emailTransporter = nodemailer.createTransport({
            host: process.env.SENDER_EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_APP_PASSWORD
            }

        });
    }

    async logIn( {phone, password}: LoginDto) {
        try {
            const user = await this.prisma.users.findUniqueOrThrow(
                {
                    where: {phone}
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


    async resetPassword({phone, password}: LoginDto) 
    {
        var newPassword = password;

        try {
            await this.prisma.users.update(
                {
                    data: {password_hash: await bcrypt.hash(newPassword, saltOrRounds)},
                    where: {email: phone}
                }
            );
            return {
                message: "password updated"
            }
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

        await this.emailTransporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'OTP for password resetting',
        text: `Your OTP is ${OTP}`,
        html: `<p>Your OTP is <strong>${OTP}</strong></p>`,
      });

        }
        catch(e) {
            console.log(e);
            throw new InternalServerErrorException('something went wrong');
        }

    }


    async verifyOTP({otp, email}: VerifyOtpDto) {
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
                        throw new HttpException('OTP expired', HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        return {
                            message: "OTP verified"
                        }
                    }
                }
                else {
                    throw new HttpException('wrong OTP', HttpStatus.UNAUTHORIZED);
                }
            }
        }

        catch(e) {
            if(e instanceof HttpException) {
                throw e;
            }
            throw new InternalServerErrorException('something went wrong');
        }
    }
}
