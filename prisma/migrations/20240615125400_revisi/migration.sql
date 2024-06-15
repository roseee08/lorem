/*
  Warnings:

  - Added the required column `ras` to the `Peliharaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peliharaan` ADD COLUMN `ras` VARCHAR(191) NOT NULL;
