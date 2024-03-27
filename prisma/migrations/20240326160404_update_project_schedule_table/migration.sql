/*
  Warnings:

  - You are about to drop the column `scheduled_at` on the `project_schedule` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `project_schedule` table. All the data in the column will be lost.
  - Added the required column `funding_due_date` to the `project_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funding_start_date` to the `project_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_due_date` to the `project_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_settlement_date` to the `project_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project_schedule` DROP COLUMN `scheduled_at`,
    DROP COLUMN `type`,
    ADD COLUMN `funding_due_date` DATETIME(3) NOT NULL,
    ADD COLUMN `funding_start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `payment_due_date` DATETIME(3) NOT NULL,
    ADD COLUMN `payment_settlement_date` DATETIME(3) NOT NULL;
