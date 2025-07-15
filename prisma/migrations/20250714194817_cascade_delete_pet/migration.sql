-- DropForeignKey
ALTER TABLE `vacinacao` DROP FOREIGN KEY `Vacinacao_petId_fkey`;

-- DropIndex
DROP INDEX `Vacinacao_petId_fkey` ON `vacinacao`;

-- AddForeignKey
ALTER TABLE `Vacinacao` ADD CONSTRAINT `Vacinacao_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
