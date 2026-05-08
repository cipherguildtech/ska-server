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
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { EventsGateway } from './gateway/events.gateway';
import { EventsGatewayModule } from './gateway/events.module';
import { SalesService } from './sales/sales.service';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [EventsGatewayModule,
    PrismaModule,
    CustomersModule,
    TasksModule,
    ProjectsModule,
    QuotationModule,
    PaymentModule,
    ProjectHistoryModule,
    AuthModule,
    UsersModule,
    SalesModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, SalesService],
})
export class AppModule { }
