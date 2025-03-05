/*
  Warnings:

  - You are about to drop the column `acess_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `acess_token`,
    DROP COLUMN `status`,
    ADD COLUMN `token` VARCHAR(191) NULL;
