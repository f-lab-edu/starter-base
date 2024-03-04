-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('REVIEW_PENDING', 'REVIEW_PASSED', 'REVIEW_FAILED', 'PROJECT_CANCELED', 'FUNDING_OPENED', 'FUNDING_SUCCESS', 'FUNDING_FAILURE', 'FUNDING_CANCELED', 'SETTLEMENT_COMPLETED', 'PROJECT_HALTED') NOT NULL,
    `title` VARCHAR(32) NOT NULL,
    `summary` VARCHAR(50) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `thumbnail_url` VARCHAR(2000) NOT NULL,
    `target_amount` BIGINT NOT NULL,
    `collected_amount` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `project_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
