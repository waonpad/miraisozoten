/*
  Warnings:

  - Added the required column `factorPrefectureId` to the `GameLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GameLog` ADD COLUMN `factorPrefectureId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `GameLog_factorPrefectureId_idx` ON `GameLog`(`factorPrefectureId`);
