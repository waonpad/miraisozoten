/*
  Warnings:

  - Added the required column `en` to the `Prefecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kana` to the `Prefecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short` to the `Prefecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Prefecture` ADD COLUMN `en` VARCHAR(191) NOT NULL,
    ADD COLUMN `kana` VARCHAR(191) NOT NULL,
    ADD COLUMN `short` VARCHAR(191) NOT NULL;
