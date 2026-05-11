// create-quotation.dto.ts

import {
  IsUUID,
  IsOptional,
  IsNumber,
  IsEnum,
  IsString,
  IsArray,
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
  @IsArray()
  @IsString({ each: true })
  pdf_url?: string[];
}