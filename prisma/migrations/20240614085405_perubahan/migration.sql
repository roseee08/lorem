/*
  Warnings:

  - The values [MALE,FEMALE] on the enum `Peliharaan_jenisKelamin` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `jenisPeliharaan` to the `Peliharaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peliharaan` ADD COLUMN `jenisPeliharaan` ENUM('KUCING', 'ANJING') NOT NULL,
    MODIFY `jenisKelamin` ENUM('JANTAN', 'BETINA') NOT NULL;
