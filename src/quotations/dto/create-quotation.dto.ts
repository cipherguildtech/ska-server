// create-quotation.dto.ts

import {
  IsUUID,
  IsOptional,
  IsNumber,
  IsEnum,
  IsString,
} from 'class-validator';

export enum ApprovalStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateQuotationDto {
  @IsUUID()
  task_id: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  advance_paid?: number;

  @IsOptional()
  @IsEnum(ApprovalStatus)
  approval_status?: ApprovalStatus;

  @IsOptional()
  @IsString()
  pdf_url?: string;
}