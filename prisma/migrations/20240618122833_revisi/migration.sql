/*
  Warnings:

  - You are about to drop the column `umur` on the `peliharaan` table. All the data in the column will be lost.
  - Added the required column `tanggalLahir` to the `Peliharaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peliharaan` DROP COLUMN `umur`,
    ADD COLUMN `tanggalLahir` DATETIME(3) NOT NULL;
