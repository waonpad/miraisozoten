-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weapon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `attackPower` INTEGER NOT NULL,
    `attribute` ENUM('SWORD', 'BOW') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prefecture` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `short` VARCHAR(191) NOT NULL,
    `kana` VARCHAR(191) NOT NULL,
    `en` VARCHAR(191) NOT NULL,
    `regionId` INTEGER NOT NULL,

    UNIQUE INDEX `Prefecture_id_key`(`id`),
    INDEX `Prefecture_regionId_idx`(`regionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrefectureStats` (
    `id` INTEGER NOT NULL,
    `population` INTEGER NOT NULL,
    `area` DOUBLE NOT NULL,

    UNIQUE INDEX `PrefectureStats_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrefectureStatsMetadata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('POPULATION', 'AREA') NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `sourceSiteName` VARCHAR(191) NOT NULL,
    `sourceUrlTitle` VARCHAR(191) NOT NULL,
    `sourceUrl` VARCHAR(191) NOT NULL,
    `retrievedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` VARCHAR(191) NOT NULL,
    `state` ENUM('STARTING', 'PREPARING', 'ACTING', 'FINISHED') NOT NULL,
    `difficulty` ENUM('EASY', 'NORMAL', 'HIDDEN_NORMAL', 'HARD') NOT NULL,
    `mode` ENUM('NATIONWIDE', 'REGIONAL') NOT NULL,
    `prefectureId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Game_prefectureId_idx`(`prefectureId`),
    INDEX `Game_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` VARCHAR(191) NOT NULL,
    `highLow` ENUM('HIGH', 'LOW') NOT NULL,
    `factorPrefectureId` INTEGER NOT NULL,
    `factorName` ENUM('POPULATION', 'AREA') NOT NULL,
    `opponentId` INTEGER NOT NULL,
    `result` ENUM('WIN', 'DRAW', 'LOSE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `GameLog_gameId_idx`(`gameId`),
    INDEX `GameLog_opponentId_idx`(`opponentId`),
    INDEX `GameLog_factorPrefectureId_idx`(`factorPrefectureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NeighborPrefecture` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NeighborPrefecture_AB_unique`(`A`, `B`),
    INDEX `_NeighborPrefecture_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
