/*
  Warnings:

  - Added the required column `fotoPeliharaan` to the `Peliharaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peliharaan` ADD COLUMN `fotoPeliharaan` VARCHAR(191) NOT NULL;
