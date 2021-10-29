/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `college` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `college_name_uindex` ON `college`(`name`);
