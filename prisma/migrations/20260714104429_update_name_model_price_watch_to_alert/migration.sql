/*
  Warnings:

  - You are about to drop the `pricewatchs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pricewatchs` DROP FOREIGN KEY `priceWatchs_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `pricewatchs` DROP FOREIGN KEY `priceWatchs_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `pricewatchs` DROP FOREIGN KEY `priceWatchs_variant_id_fkey`;

-- DropTable
DROP TABLE `pricewatchs`;

-- CreateTable
CREATE TABLE `alerts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `watch_price` INTEGER NULL,
    `disabled` BOOLEAN NOT NULL DEFAULT false,
    `watch_availability` BOOLEAN NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `variant_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `alerts_product_id_variant_id_user_id_key`(`product_id`, `variant_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alerts` ADD CONSTRAINT `alerts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alerts` ADD CONSTRAINT `alerts_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alerts` ADD CONSTRAINT `alerts_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `productVariants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
