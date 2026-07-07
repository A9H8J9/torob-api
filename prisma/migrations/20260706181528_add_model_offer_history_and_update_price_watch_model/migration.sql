/*
  Warnings:

  - A unique constraint covering the columns `[product_id,variant_id,user_id]` on the table `priceWatchs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `priceWatchs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pricewatchs` ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL,
    ADD COLUMN `variant_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `offerHistories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `offer_id` INTEGER NOT NULL,
    `old_price` INTEGER NULL,
    `new_price` INTEGER NULL,
    `old_available` BOOLEAN NULL,
    `new_available` BOOLEAN NULL,
    `type` ENUM('PRICE_INCREASE', 'PRICE_DECREASE', 'AVAILABLE', 'UNAVAILABLE') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `offerHistories_offer_id_created_at_idx`(`offer_id`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `priceWatchs_product_id_variant_id_user_id_key` ON `priceWatchs`(`product_id`, `variant_id`, `user_id`);

-- AddForeignKey
ALTER TABLE `priceWatchs` ADD CONSTRAINT `priceWatchs_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `productVariants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offerHistories` ADD CONSTRAINT `offerHistories_offer_id_fkey` FOREIGN KEY (`offer_id`) REFERENCES `offers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
