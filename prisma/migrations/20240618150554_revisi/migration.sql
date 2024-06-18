/*
  Warnings:

  - Added the required column `tanggalLahir` to the `Peliharaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peliharaan` ADD COLUMN `tanggalLahir` DATETIME(3) NOT NULL;
