import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule,
    

  ],
  imports: [PrismaModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
