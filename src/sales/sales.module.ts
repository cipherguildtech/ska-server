import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { CustomersModule } from '../customers/customers.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    ProjectsModule, // IMPORTANT
    CustomersModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule { }
