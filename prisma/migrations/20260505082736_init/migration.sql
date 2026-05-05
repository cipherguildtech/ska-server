-- CreateEnum
CREATE TYPE "Users_role" AS ENUM ('ADMIN', 'HR', 'DIRECTOR', 'SALES', 'TEAM', 'STAFF');

-- CreateEnum
CREATE TYPE "Users_dept" AS ENUM ('DESIGNING', 'SITE_VISITING', 'MARKETING', 'WELDING', 'FITTING', 'TRANSPORT', 'PRINTING', 'CNC_CUTTING', 'LASER', 'LETTER_MAKING', 'ERRACTON', 'ORDER');

-- CreateEnum
CREATE TYPE "Customer_type" AS ENUM ('WALKIN', 'REFERRAL', 'EXISTING');

-- CreateEnum
CREATE TYPE "Service_type" AS ENUM ('ADS', 'BOARD', 'BANNER', 'LED_BOARD', 'ROAD_SHOW', 'INVITATION', 'CARD', 'DESIGN', 'PAMPLET', 'VISITING_CARD', 'OTHERS', 'BRANDING');

-- CreateEnum
CREATE TYPE "Project_status" AS ENUM ('ACTIVE', 'ON_HOLD', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Task_status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REVIEW');

-- CreateEnum
CREATE TYPE "Approval_status" AS ENUM ('DRAFT', 'SENT', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Payment_type" AS ENUM ('ADVANCE', 'PARTIAL', 'FINAL');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "otp" TEXT,
    "otp_expiry" TIMESTAMP(3),
    "role" "Users_role" NOT NULL,
    "department" "Users_dept",
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "customer_type" "Customer_type" NOT NULL,
    "referal" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "project_code" TEXT NOT NULL,
    "service_type" "Service_type" NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Project_status" NOT NULL DEFAULT 'ACTIVE',
    "current_stage" INTEGER NOT NULL DEFAULT 1,
    "paid" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "deadline" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_user_email" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "assigned_to" TEXT NOT NULL,
    "assigned_by" TEXT NOT NULL,
    "department" "Users_dept" NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "description" TEXT,
    "status" "Task_status" NOT NULL DEFAULT 'PENDING',
    "files" TEXT,
    "history" TEXT,
    "work_details" TEXT,
    "is_quotation" BOOLEAN NOT NULL DEFAULT false,
    "due_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotations" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "advance_paid" DECIMAL(10,2),
    "approval_status" "Approval_status" NOT NULL DEFAULT 'DRAFT',
    "pdf_url" TEXT,
    "approved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "quotation_id" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "type" "Payment_type" NOT NULL,
    "reference" TEXT,
    "paid_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectHistory" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "task_old_status" "Task_status" NOT NULL,
    "task_new_status" "Task_status" NOT NULL,
    "detail" JSONB,
    "note" TEXT,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE INDEX "Users_department_idx" ON "Users"("department");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Customer_phone_idx" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_project_code_key" ON "Projects"("project_code");

-- CreateIndex
CREATE INDEX "Projects_customer_email_idx" ON "Projects"("customer_email");

-- CreateIndex
CREATE INDEX "Projects_status_idx" ON "Projects"("status");

-- CreateIndex
CREATE INDEX "Projects_created_user_email_fkey" ON "Projects"("created_user_email");

-- CreateIndex
CREATE INDEX "Tasks_project_id_idx" ON "Tasks"("project_id");

-- CreateIndex
CREATE INDEX "Tasks_assigned_to_idx" ON "Tasks"("assigned_to");

-- CreateIndex
CREATE INDEX "Tasks_assigned_by_fkey" ON "Tasks"("assigned_by");

-- CreateIndex
CREATE INDEX "Quotations_task_id_idx" ON "Quotations"("task_id");

-- CreateIndex
CREATE INDEX "Payments_project_id_idx" ON "Payments"("project_id");

-- CreateIndex
CREATE INDEX "Payments_quotation_id_idx" ON "Payments"("quotation_id");

-- CreateIndex
CREATE INDEX "ProjectHistory_project_id_idx" ON "ProjectHistory"("project_id");

-- CreateIndex
CREATE INDEX "ProjectHistory_changed_by_fkey" ON "ProjectHistory"("changed_by");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_created_user_email_fkey_1" FOREIGN KEY ("created_user_email") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_customer_email_fkey" FOREIGN KEY ("customer_email") REFERENCES "Customer"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "fkey_tasks_assigner" FOREIGN KEY ("assigned_by") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "fkey_tasks_assignee" FOREIGN KEY ("assigned_to") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotations" ADD CONSTRAINT "Quotations_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "Quotations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "fkey_projecthistory_user" FOREIGN KEY ("changed_by") REFERENCES "Users"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
