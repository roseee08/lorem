/*
  Warnings:

  - You are about to drop the column `jadwalMakan` on the `jadwalmakan` table. All the data in the column will be lost.
  - The values [JANTAN,BETINA] on the enum `Peliharaan_jenisKelamin` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `tahap` to the `JadwalMakan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jadwalmakan` DROP COLUMN `jadwalMakan`,
    ADD COLUMN `tahap` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `peliharaan` MODIFY `jenisKelamin` ENUM('MALE', 'FEMALE') NOT NULL;
