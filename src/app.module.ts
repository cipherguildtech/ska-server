import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { TasksModule } from './tasks/tasks.module';

import { QuotationModule } from './quotations/quotations.module';

import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [PrismaModule, CustomersModule, TasksModule, ProjectsModule ,QuotationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
