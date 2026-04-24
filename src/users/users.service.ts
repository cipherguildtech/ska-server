import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/wasm-compiler-edge';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getUsers() {
        try {
            return await this.prisma.users.findMany(
                {
                    omit: {
                        id: true,
                        otp: true,
                        otp_expiry: true,
                        password_hash: true,
                    },
                    include: {
                        history_logs: true,
                        assigned_tasks: true,
                        created_tasks: true
                    }
                }
            );
        }
        catch(e) {
            throw new InternalServerErrorException('something went wrong')
        }
    }
    

    async getUser(phone: string) {
        try {
            return await this.prisma.users.findUniqueOrThrow(
                {
                    where: {
                        phone
                    },

                    omit: {
                        id: true,
                        otp: true,
                        otp_expiry: true,
                        password_hash: true,
                        created_at: true,
                    },
                    
                    include: {
                        history_logs: true,
                        assigned_tasks: true,
                        created_tasks: true
                    }
                }
            )
        }
        catch(e) {
            if( e instanceof PrismaClientKnownRequestError) {
                if(e.code == 'P2025') {
                    throw new NotFoundException('user not exsists')
                }
            }
            else {
                console.log(e);
                throw new InternalServerErrorException("something went wrong");
            }
        }
    }

    async updateUser(phone: string, {name, email} : {name: string, email: string})
    {
        try{
        return this.prisma.users.update(
            {
                where: {phone: phone},
                data: {
                    full_name: name,
                    email: email
                }
            }
        )
    }
    catch(e) {
        console.log(e)
    }
    }


}
