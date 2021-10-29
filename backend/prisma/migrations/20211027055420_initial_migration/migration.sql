-- CreateTable
CREATE TABLE `administrator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authority` INTEGER NOT NULL,
    `profile_id` INTEGER NULL,

    INDEX `profile_id`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assessment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `assessment_map` JSON NOT NULL,
    `assessment_res` JSON NULL,
    `points` DOUBLE NULL,
    `possible` DOUBLE NULL,
    `due_date` DATETIME(0) NOT NULL,
    `start_date` DATETIME(0) NULL,
    `completion_date` DATETIME(0) NULL,
    `duration` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assigned` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollment_id` INTEGER NULL,
    `assignment_id` INTEGER NULL,
    `assessment_id` INTEGER NULL,

    INDEX `assessment_id`(`assessment_id`),
    INDEX `assignment_id`(`assignment_id`),
    INDEX `enrollment_id`(`enrollment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` INTEGER NOT NULL,
    `content_type` VARCHAR(255) NOT NULL,
    `points` DOUBLE NULL,
    `possible` DOUBLE NULL,
    `due_date` DATETIME(0) NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NULL,
    `term` ENUM('spring', 'summer', 'summer_mm1', 'summer_mm2', 'fall') NOT NULL,
    `academic_year` INTEGER NOT NULL,
    `registration_start` DATE NOT NULL,
    `registration_end` DATE NOT NULL,

    INDEX `course_id`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `building` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `college_id` INTEGER NULL,

    UNIQUE INDEX `name`(`name`),
    INDEX `college_id`(`college_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `college` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `credit_hours` INTEGER NOT NULL,
    `major_id` INTEGER NULL,

    INDEX `major_id`(`major_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `credentials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password_hash` VARCHAR(255) NOT NULL,
    `password_updated` DATETIME(0) NULL,
    `last_login` DATETIME(0) NULL,
    `signup_date` DATETIME(0) NOT NULL,

    UNIQUE INDEX `password_hash`(`password_hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instructor_id` INTEGER NULL,
    `college_id` VARCHAR(255) NULL,

    INDEX `instructor_id`(`instructor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NULL,
    `section_id` INTEGER NULL,

    INDEX `section_id`(`section_id`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instructor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profile_id` INTEGER NULL,

    INDEX `profile_id`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `major` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `college_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `college_id`(`college_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messaging` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollment_id` INTEGER NULL,
    `sent_date` DATETIME(0) NOT NULL,
    `content` VARCHAR(1000) NOT NULL,

    INDEX `enrollment_id`(`enrollment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `biography` VARCHAR(300) NULL,
    `university` VARCHAR(255) NULL,
    `credentials_id` INTEGER NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `credentials_id`(`credentials_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `availability_id` INTEGER NOT NULL,
    `instructor_id` INTEGER NOT NULL,
    `course_tag` VARCHAR(255) NOT NULL,
    `section_crn` INTEGER NOT NULL,
    `section_start` DATE NULL,
    `section_end` DATE NULL,
    `building_id` INTEGER NULL,
    `room_num` INTEGER NULL,
    `schedule` VARCHAR(255) NULL,
    `online` BOOLEAN NOT NULL,

    UNIQUE INDEX `section_crn`(`section_crn`),
    INDEX `availability_id`(`availability_id`),
    INDEX `building_id`(`building_id`),
    INDEX `instructor_id`(`instructor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `major_id` INTEGER NULL,
    `enrollment_id` INTEGER NULL,
    `profile_id` INTEGER NOT NULL,

    UNIQUE INDEX `enrollment_id`(`enrollment_id`),
    INDEX `major_id`(`major_id`),
    INDEX `profile_id`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `administrator` ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assigned` ADD CONSTRAINT `assigned_ibfk_3` FOREIGN KEY (`assessment_id`) REFERENCES `assessment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assigned` ADD CONSTRAINT `assigned_ibfk_2` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assigned` ADD CONSTRAINT `assigned_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `availability` ADD CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `building` ADD CONSTRAINT `building_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `section`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student`(`enrollment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `instructor` ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `major` ADD CONSTRAINT `major_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messaging` ADD CONSTRAINT `messaging_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`credentials_id`) REFERENCES `credentials`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `profile` AUTO_INCREMENT = 100000;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`availability_id`) REFERENCES `availability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_ibfk_3` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
