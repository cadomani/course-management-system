/*
  Warnings:

  - A unique constraint covering the columns `[college_id,name]` on the table `major` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `major_college_id_name_key` ON `major`(`college_id`, `name`);
