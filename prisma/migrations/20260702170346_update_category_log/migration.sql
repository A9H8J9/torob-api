/*
  Warnings:

  - Added the required column `updated_at` to the `categoryLog` table without a default value. This is not possible if the table is not empty.
  - Made the column `count` on table `categorylog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `categorylog` ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL,
    MODIFY `count` INTEGER NOT NULL DEFAULT 1;
