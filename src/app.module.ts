import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { TasksModule } from './tasks/tasks.module';
import { QuotationModule } from './quotations/quotations.module';
import { ProjectsModule } from './projects/projects.module';
import { PaymentModule } from './payments/payment.module';
import { ProjectHistoryModule } from './project_history/project_history.module';

@Module({
  imports: [PrismaModule,
    CustomersModule,
    TasksModule,
    ProjectsModule,
    QuotationModule,
    PaymentModule,
    ProjectHistoryModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
