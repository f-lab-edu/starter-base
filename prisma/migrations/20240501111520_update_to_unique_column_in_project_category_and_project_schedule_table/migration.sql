/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `project_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_id]` on the table `project_schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `project_category_name_key` ON `project_category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `project_schedule_project_id_key` ON `project_schedule`(`project_id`);
