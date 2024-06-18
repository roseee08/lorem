/*
  Warnings:

  - You are about to drop the column `tanggalLahir` on the `peliharaan` table. All the data in the column will be lost.
  - Added the required column `umur` to the `Peliharaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peliharaan` DROP COLUMN `tanggalLahir`,
    ADD COLUMN `umur` VARCHAR(191) NOT NULL;
