/*
  Warnings:

  - A unique constraint covering the columns `[college_id,name]` on the table `building` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `name` ON `building`;

-- CreateIndex
CREATE UNIQUE INDEX `building_college_id_name_key` ON `building`(`college_id`, `name`);
