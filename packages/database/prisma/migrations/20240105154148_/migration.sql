/*
  Warnings:

  - Added the required column `appleConsumption` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bridgeCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `convenienceStoreCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forestArea` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kerosenePrice` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `morningReadingEnforcementRate` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postOfficeCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riceConsumption` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starbucksCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tunnelCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqloCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GameLog` MODIFY `factorName` ENUM('IMPORTANT_CULTURAL_PROPERTY_COUNT', 'ACADEMICABILITY', 'ANNUAL_PRECIPITATION', 'APPLE_CONSUMPTION', 'AREA', 'ARTMUSEUM_COUNT', 'ATTRACTIVENESS_RANKING', 'AVERAGE_TEMPERATURE', 'BRIDGE_COUNT', 'CONVENIENCE_STORE_COUNT', 'DETACHED_HOUSE_RATE', 'DEVIATION_VALUE', 'ELEMENTARY_SCHOOL_COUNT', 'FOREST_AREA', 'GARBAGE_RECYCLING_RATE', 'G_D_P', 'HOMETOWN_TAX', 'KEROSENE_PRICE', 'KOSHIEN_COUNT', 'MORNING_READING_ENFORCEMENT_RATE', 'NATURAL_MONUMENT_COUNT', 'POPULATION', 'POST_OFFICE_COUNT', 'RICE_CONSUMPTION', 'RICE_PRODUCTION_RATE', 'SHRINE_COUNT', 'SOCCER_POPULATION', 'STARBUCKS_COUNT', 'STATION_COUNT', 'SUGAR_CONSUMPTION', 'TUNNEL_COUNT', 'UNIQLO_COUNT') NOT NULL;

-- AlterTable
ALTER TABLE `PrefectureStats` ADD COLUMN `appleConsumption` INTEGER NOT NULL,
    ADD COLUMN `bridgeCount` INTEGER NOT NULL,
    ADD COLUMN `convenienceStoreCount` INTEGER NOT NULL,
    ADD COLUMN `forestArea` INTEGER NOT NULL,
    ADD COLUMN `kerosenePrice` INTEGER NOT NULL,
    ADD COLUMN `morningReadingEnforcementRate` INTEGER NOT NULL,
    ADD COLUMN `postOfficeCount` INTEGER NOT NULL,
    ADD COLUMN `riceConsumption` INTEGER NOT NULL,
    ADD COLUMN `starbucksCount` INTEGER NOT NULL,
    ADD COLUMN `tunnelCount` INTEGER NOT NULL,
    ADD COLUMN `uniqloCount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PrefectureStatsMetadata` MODIFY `name` ENUM('IMPORTANT_CULTURAL_PROPERTY_COUNT', 'ACADEMICABILITY', 'ANNUAL_PRECIPITATION', 'APPLE_CONSUMPTION', 'AREA', 'ARTMUSEUM_COUNT', 'ATTRACTIVENESS_RANKING', 'AVERAGE_TEMPERATURE', 'BRIDGE_COUNT', 'CONVENIENCE_STORE_COUNT', 'DETACHED_HOUSE_RATE', 'DEVIATION_VALUE', 'ELEMENTARY_SCHOOL_COUNT', 'FOREST_AREA', 'GARBAGE_RECYCLING_RATE', 'G_D_P', 'HOMETOWN_TAX', 'KEROSENE_PRICE', 'KOSHIEN_COUNT', 'MORNING_READING_ENFORCEMENT_RATE', 'NATURAL_MONUMENT_COUNT', 'POPULATION', 'POST_OFFICE_COUNT', 'RICE_CONSUMPTION', 'RICE_PRODUCTION_RATE', 'SHRINE_COUNT', 'SOCCER_POPULATION', 'STARBUCKS_COUNT', 'STATION_COUNT', 'SUGAR_CONSUMPTION', 'TUNNEL_COUNT', 'UNIQLO_COUNT') NOT NULL;
