/*
  Warnings:

  - You are about to drop the column `prefectureId` on the `PrefectureStats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Prefecture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PrefectureStats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `PrefectureStats_prefectureId_key` ON `PrefectureStats`;

-- AlterTable
ALTER TABLE `PrefectureStats` DROP COLUMN `prefectureId`;

-- CreateIndex
CREATE UNIQUE INDEX `Prefecture_id_key` ON `Prefecture`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `PrefectureStats_id_key` ON `PrefectureStats`(`id`);
