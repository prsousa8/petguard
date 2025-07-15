/*
  Warnings:

  - Made the column `descricao` on table `pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `pet` MODIFY `descricao` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Vacinacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `petId` INTEGER NOT NULL,
    `vacina` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `observacao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vacinacao` ADD CONSTRAINT `Vacinacao_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
