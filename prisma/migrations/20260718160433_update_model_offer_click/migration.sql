/*
  Warnings:

  - Added the required column `product_id` to the `offerClicks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_id` to the `offerClicks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `offerclicks` DROP FOREIGN KEY `offerClicks_offer_id_fkey`;

-- DropForeignKey
ALTER TABLE `offerclicks` DROP FOREIGN KEY `offerClicks_user_id_fkey`;

-- AlterTable
ALTER TABLE `offerclicks` ADD COLUMN `ip` VARCHAR(45) NULL,
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `referer` TEXT NULL,
    ADD COLUMN `shop_id` INTEGER NOT NULL,
    ADD COLUMN `user_agent` TEXT NULL,
    MODIFY `user_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `offerClicks_product_id_idx` ON `offerClicks`(`product_id`);

-- CreateIndex
CREATE INDEX `offerClicks_shop_id_idx` ON `offerClicks`(`shop_id`);

-- CreateIndex
CREATE INDEX `offerClicks_created_at_idx` ON `offerClicks`(`created_at`);

-- AddForeignKey
ALTER TABLE `offerClicks` ADD CONSTRAINT `offerClicks_offer_id_fkey` FOREIGN KEY (`offer_id`) REFERENCES `offers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offerClicks` ADD CONSTRAINT `offerClicks_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offerClicks` ADD CONSTRAINT `offerClicks_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offerClicks` ADD CONSTRAINT `offerClicks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `offerclicks` RENAME INDEX `offerClicks_user_id_fkey` TO `offerClicks_user_id_idx`;
