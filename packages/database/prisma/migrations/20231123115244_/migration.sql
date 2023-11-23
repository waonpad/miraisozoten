-- AlterTable
ALTER TABLE `Game` ADD COLUMN `clearTime` DOUBLE NULL;

-- AlterTable
ALTER TABLE `PrefectureStats` MODIFY `area` INTEGER NOT NULL;
