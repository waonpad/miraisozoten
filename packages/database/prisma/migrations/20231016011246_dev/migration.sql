/*
  Warnings:

  - You are about to alter the column `attribute` on the `Weapon` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Weapon` MODIFY `attribute` ENUM('SWORD', 'BOW') NOT NULL;
