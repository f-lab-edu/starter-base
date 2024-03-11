-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `project_category_id_fkey`;

-- AlterTable
ALTER TABLE `project` MODIFY `status` ENUM('DRAFT', 'REVIEW_PENDING', 'REVIEW_PASSED', 'REVIEW_FAILED', 'PROJECT_CANCELED', 'FUNDING_OPENED', 'FUNDING_SUCCESS', 'FUNDING_FAILURE', 'FUNDING_CANCELED', 'SETTLEMENT_COMPLETED', 'PROJECT_HALTED') NOT NULL DEFAULT 'DRAFT',
    MODIFY `target_amount` BIGINT NOT NULL DEFAULT 0,
    MODIFY `collected_amount` BIGINT NOT NULL DEFAULT 0,
    MODIFY `category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `project_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
