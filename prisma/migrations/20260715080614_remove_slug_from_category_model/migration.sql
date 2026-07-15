/*
  Warnings:

  - You are about to drop the column `slug` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the `productclicks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `productclicks` DROP FOREIGN KEY `productClicks_offer_id_fkey`;

-- DropForeignKey
ALTER TABLE `productclicks` DROP FOREIGN KEY `productClicks_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `productclicks` DROP FOREIGN KEY `productClicks_user_id_fkey`;

-- DropIndex
DROP INDEX `categories_slug_key` ON `categories`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `slug`;

-- DropTable
DROP TABLE `productclicks`;

-- CreateTable
CREATE TABLE `offerClicks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `offer_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `offerClicks_offer_id_idx`(`offer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `categories_url_key` ON `categories`(`url`);

-- AddForeignKey
ALTER TABLE `offerClicks` ADD CONSTRAINT `offerClicks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offerClicks` ADD CONSTRAINT `offerClicks_offer_id_fkey` FOREIGN KEY (`offer_id`) REFERENCES `offers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
