/*
  Warnings:

  - You are about to drop the `shop_contacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `shop_contacts` DROP FOREIGN KEY `shop_contacts_shop_id_fkey`;

-- DropTable
DROP TABLE `shop_contacts`;

-- CreateTable
CREATE TABLE `shopContacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PHONE', 'MESSENGER', 'SOCIAL_MEDIA') NOT NULL,
    `platform` ENUM('PHONE', 'BALE', 'WHATSAPP', 'TELEGRAM', 'INSTAGRAM') NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `shop_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `shopContacts_shop_id_idx`(`shop_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shopContacts` ADD CONSTRAINT `shopContacts_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
