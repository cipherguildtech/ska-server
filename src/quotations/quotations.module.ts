import { Module } from "@nestjs/common";
import { QuotationController } from "./quotations.controller";
import { QuotationServices } from "./quotations.service";

@Module({
   
  controllers: [QuotationController],
  providers: [QuotationServices],
  
})
export class QuotationModule{}