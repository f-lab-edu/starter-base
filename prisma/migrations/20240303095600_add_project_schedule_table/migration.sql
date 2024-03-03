-- CreateTable
CREATE TABLE `project_schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('FUNDING_START_DATE', 'FUNDING_DUE_DATE', 'PAYMENT_DUE_DATE', 'PAYMENT_SETTLEMENT_DATE') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project_schedule` ADD CONSTRAINT `project_schedule_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
