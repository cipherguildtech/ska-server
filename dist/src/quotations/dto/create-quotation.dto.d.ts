export declare enum ApprovalStatus {
    DRAFT = "DRAFT",
    SENT = "SENT",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class CreateQuotationDto {
    task_id: string;
    amount: number;
    advance_paid?: number;
    approval_status?: ApprovalStatus;
    pdf_url?: string[];
}
