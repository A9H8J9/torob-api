-- AlterTable
ALTER TABLE `pricewatchs` ADD COLUMN `watch_availability` BOOLEAN NULL DEFAULT false,
    MODIFY `watch_price` INTEGER NULL;
