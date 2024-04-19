/*
  Warnings:

  - The values [REVIEW_PASSED,REVIEW_FAILED,PROJECT_HALTED] on the enum `project_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `status` ENUM('DRAFT', 'REVIEW_PENDING', 'REVIEW_APPROVED', 'REVIEW_REJECTED', 'PROJECT_CANCELED', 'TO_BE_RELEASED', 'FUNDING_OPENED', 'FUNDING_SUCCESS', 'FUNDING_FAILURE', 'FUNDING_CANCELED', 'SETTLEMENT_COMPLETED') NOT NULL DEFAULT 'DRAFT';
