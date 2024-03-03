-- CreateTable
CREATE TABLE `sponsorship_reword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `reword_id` INTEGER NOT NULL,
    `sponsorship_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sponsorship_reword` ADD CONSTRAINT `sponsorship_reword_reword_id_fkey` FOREIGN KEY (`reword_id`) REFERENCES `project_reword`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sponsorship_reword` ADD CONSTRAINT `sponsorship_reword_sponsorship_id_fkey` FOREIGN KEY (`sponsorship_id`) REFERENCES `sponsorship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
