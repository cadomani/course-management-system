/*
  Warnings:

  - Made the column `college_id` on table `department` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `department` MODIFY `college_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `department_ibfk_2` FOREIGN KEY (`college_id`) REFERENCES `college`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
