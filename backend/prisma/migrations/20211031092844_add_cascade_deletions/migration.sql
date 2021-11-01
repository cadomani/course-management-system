-- DropForeignKey
ALTER TABLE `administrator` DROP FOREIGN KEY `administrator_ibfk_1`;

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
ALTER TABLE `enrollment` DROP FOREIGN KEY `enrollment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `instructor` DROP FOREIGN KEY `instructor_ibfk_1`;

-- DropForeignKey
ALTER TABLE `messaging` DROP FOREIGN KEY `messaging_ibfk_1`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_ibfk_1`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `section_ibfk_1`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `section_ibfk_2`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `student_ibfk_2`;

-- AddForeignKey
ALTER TABLE `administrator` ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assigned` ADD CONSTRAINT `assigned_ibfk_3` FOREIGN KEY (`assessment_id`) REFERENCES `assessment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assigned` ADD CONSTRAINT `assigned_ibfk_2` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assigned` ADD CONSTRAINT `assigned_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `availability` ADD CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `section`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `instructor` ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messaging` ADD CONSTRAINT `messaging_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`credentials_id`) REFERENCES `credentials`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`availability_id`) REFERENCES `availability`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
