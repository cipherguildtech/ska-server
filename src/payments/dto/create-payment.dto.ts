// create-payment.dto.ts

import { Payment_type } from '@prisma/client';
import {
  IsUUID,
  IsOptional,
  IsNumber,
  IsEnum,
  IsString,
  IsDateString,
} from 'class-validator';

 

export class CreatePaymentDto {
  @IsUUID()
  project_id: string;

  @IsOptional()
  @IsUUID()
  quotation_id?: string;

  @IsNumber()
  amount: number;

  @IsEnum(Payment_type)
  type: Payment_type;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsDateString()
  paid_at: string;
}