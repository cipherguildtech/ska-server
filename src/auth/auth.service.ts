import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './DTO/loginDto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { RegisterDto } from './DTO/registerDto';
import * as bcrypt from 'bcrypt';
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

    async sendOTP() {

    }
}
