import { Payment_type } from '@prisma/client';
export declare class CreatePaymentDto {
    project_id: string;
    quotation_id?: string;
    amount: number;
    type: Payment_type;
    reference?: string;
    paid_at: string;
}
