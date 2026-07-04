/*
  Warnings:

  - Made the column `is_main` on table `offerimages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_active` on table `offers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `warranty_duration` on table `offers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_main` on table `offervideos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `count` on table `productclicks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_main` on table `productimages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_main` on table `shopimages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `offerimages` MODIFY `is_main` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `offers` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `warranty_duration` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `offervideos` MODIFY `is_main` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `productclicks` MODIFY `count` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `productimages` MODIFY `is_main` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `shopimages` MODIFY `is_main` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `userSearchHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `keyword` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `userSearchHistory_user_id_idx`(`user_id`),
    INDEX `userSearchHistory_keyword_idx`(`keyword`),
    UNIQUE INDEX `userSearchHistory_keyword_user_id_key`(`keyword`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `searchLogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `keyword` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `searchLogs_keyword_key`(`keyword`),
    INDEX `searchLogs_keyword_idx`(`keyword`),
    INDEX `searchLogs_count_idx`(`count`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userSearchHistory` ADD CONSTRAINT `userSearchHistory_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
