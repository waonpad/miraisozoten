-- AlterTable
ALTER TABLE `GameLog` MODIFY `factorName` ENUM('AREA', 'POPULATION') NOT NULL;

-- AlterTable
ALTER TABLE `PrefectureStatsMetadata` MODIFY `name` ENUM('AREA', 'POPULATION') NOT NULL;
