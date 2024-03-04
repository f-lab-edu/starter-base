/*
  Warnings:

  - Added the required column `scheduled_at` to the `project_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project_schedule` ADD COLUMN `scheduled_at` DATETIME(3) NOT NULL;
