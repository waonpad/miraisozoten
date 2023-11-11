/*
  Warnings:

  - The values [STARTING,PREPARING,ACTING] on the enum `Game_state` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Game` MODIFY `state` ENUM('PLAYING', 'FINISHED', 'GIVEN_UP') NOT NULL;
