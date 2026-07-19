/*
  Warnings:

  - Made the column `more_info_url` on table `offers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `offers` MODIFY `more_info_url` VARCHAR(191) NOT NULL DEFAULT '';
