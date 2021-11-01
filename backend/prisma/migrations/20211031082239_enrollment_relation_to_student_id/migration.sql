/*
  Warnings:

  - You are about to drop the column `enrollment_id` on the `student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `enrollment_ibfk_1`;

-- DropIndex
DROP INDEX `enrollment_id` ON `student`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `enrollment_id`;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
