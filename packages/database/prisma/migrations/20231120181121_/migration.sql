/*
  Warnings:

  - Added the required column `academicability` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `annualPrecipitation` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artmuseumCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attractivenessRanking` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageTemperature` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detachedHouseRate` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviationValue` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `elementarySchoolCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gDP` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garbageRecyclingRate` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hometownTax` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importantCulturalPropertyCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `koshienCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `naturalMonumentCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riceProductionRate` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shrineCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soccerPopulation` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stationCount` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sugarConsumption` to the `PrefectureStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GameLog` MODIFY `factorName` ENUM('IMPORTANT_CULTURAL_PROPERTY_COUNT', 'ACADEMICABILITY', 'ANNUAL_PRECIPITATION', 'AREA', 'ARTMUSEUM_COUNT', 'ATTRACTIVENESS_RANKING', 'AVERAGE_TEMPERATURE', 'DETACHED_HOUSE_RATE', 'DEVIATION_VALUE', 'ELEMENTARY_SCHOOL_COUNT', 'GARBAGE_RECYCLING_RATE', 'G_D_P', 'HOMETOWN_TAX', 'KOSHIEN_COUNT', 'NATURAL_MONUMENT_COUNT', 'POPULATION', 'RICE_PRODUCTION_RATE', 'SHRINE_COUNT', 'SOCCER_POPULATION', 'STATION_COUNT', 'SUGAR_CONSUMPTION') NOT NULL;

-- AlterTable
ALTER TABLE `PrefectureStats` ADD COLUMN `academicability` DOUBLE NOT NULL,
    ADD COLUMN `annualPrecipitation` INTEGER NOT NULL,
    ADD COLUMN `artmuseumCount` INTEGER NOT NULL,
    ADD COLUMN `attractivenessRanking` DOUBLE NOT NULL,
    ADD COLUMN `averageTemperature` DOUBLE NOT NULL,
    ADD COLUMN `detachedHouseRate` DOUBLE NOT NULL,
    ADD COLUMN `deviationValue` DOUBLE NOT NULL,
    ADD COLUMN `elementarySchoolCount` INTEGER NOT NULL,
    ADD COLUMN `gDP` INTEGER NOT NULL,
    ADD COLUMN `garbageRecyclingRate` DOUBLE NOT NULL,
    ADD COLUMN `hometownTax` INTEGER NOT NULL,
    ADD COLUMN `importantCulturalPropertyCount` INTEGER NOT NULL,
    ADD COLUMN `koshienCount` INTEGER NOT NULL,
    ADD COLUMN `naturalMonumentCount` INTEGER NOT NULL,
    ADD COLUMN `riceProductionRate` INTEGER NOT NULL,
    ADD COLUMN `shrineCount` INTEGER NOT NULL,
    ADD COLUMN `soccerPopulation` INTEGER NOT NULL,
    ADD COLUMN `stationCount` INTEGER NOT NULL,
    ADD COLUMN `sugarConsumption` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PrefectureStatsMetadata` MODIFY `name` ENUM('IMPORTANT_CULTURAL_PROPERTY_COUNT', 'ACADEMICABILITY', 'ANNUAL_PRECIPITATION', 'AREA', 'ARTMUSEUM_COUNT', 'ATTRACTIVENESS_RANKING', 'AVERAGE_TEMPERATURE', 'DETACHED_HOUSE_RATE', 'DEVIATION_VALUE', 'ELEMENTARY_SCHOOL_COUNT', 'GARBAGE_RECYCLING_RATE', 'G_D_P', 'HOMETOWN_TAX', 'KOSHIEN_COUNT', 'NATURAL_MONUMENT_COUNT', 'POPULATION', 'RICE_PRODUCTION_RATE', 'SHRINE_COUNT', 'SOCCER_POPULATION', 'STATION_COUNT', 'SUGAR_CONSUMPTION') NOT NULL;
