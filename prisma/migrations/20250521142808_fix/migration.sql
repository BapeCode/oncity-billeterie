/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[participantId]` on the table `QRCodeTicket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Participant` DROP FOREIGN KEY `Participant_paymentId_fkey`;

-- DropForeignKey
ALTER TABLE `Participant` DROP FOREIGN KEY `Participant_ticketId_fkey`;

-- DropIndex
DROP INDEX `Participant_email_key` ON `Participant`;

-- AlterTable
ALTER TABLE `Participant` DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `paymentId`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `method`;

-- AlterTable
ALTER TABLE `QRCodeTicket` ADD COLUMN `participantId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paymentId` INTEGER NULL,

    UNIQUE INDEX `Order_paymentId_key`(`paymentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `QRCodeTicket_participantId_key` ON `QRCodeTicket`(`participantId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QRCodeTicket` ADD CONSTRAINT `QRCodeTicket_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
