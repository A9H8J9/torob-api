/*
  Warnings:

  - Added the required column `name_en` to the `brands` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brands` ADD COLUMN `name_en` VARCHAR(191) NOT NULL;
