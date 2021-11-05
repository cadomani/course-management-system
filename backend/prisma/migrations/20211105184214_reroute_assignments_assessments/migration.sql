/*
  Warnings:

  - You are about to drop the `assigned` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `assigned` DROP FOREIGN KEY `assigned_ibfk_3`;

-- DropForeignKey
ALTER TABLE `assigned` DROP FOREIGN KEY `assigned_ibfk_2`;

-- DropForeignKey
ALTER TABLE `assigned` DROP FOREIGN KEY `assigned_ibfk_1`;

-- DropForeignKey
ALTER TABLE `availability` DROP FOREIGN KEY `availability_ibfk_1`;

-- DropForeignKey
ALTER TABLE `department` DROP FOREIGN KEY `department_ibfk_1`;

-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `enrollment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `instructor` DROP FOREIGN KEY `instructor_ibfk_1`;

-- DropForeignKey
ALTER TABLE `messaging` DROP FOREIGN KEY `messaging_ibfk_1`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `section_ibfk_1`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `section_ibfk_2`;

-- AlterTable
ALTER TABLE `assessment` ADD COLUMN `enrollment_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `assignment` ADD COLUMN `enrollment_id` INTEGER NULL;

-- DropTable
DROP TABLE `assigned`;

-- CreateIndex
CREATE INDEX `assessment_ibfk_1` ON `assessment`(`enrollment_id`);

-- CreateIndex
CREATE INDEX `assignment_ibfk_1` ON `assignment`(`enrollment_id`);

-- AddForeignKey
ALTER TABLE `assessment` ADD CONSTRAINT `assessment_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignment` ADD CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `availability` ADD CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `section`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `instructor` ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messaging` ADD CONSTRAINT `messaging_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`availability_id`) REFERENCES `availability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
