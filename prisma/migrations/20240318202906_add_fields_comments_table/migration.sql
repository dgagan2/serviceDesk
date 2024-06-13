/*
  Warnings:

  - Added the required column `name` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "name" VARCHAR(60) NOT NULL,
ADD COLUMN     "updateDate" TIMESTAMP(6);
