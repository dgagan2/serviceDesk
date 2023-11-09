/*
  Warnings:

  - Added the required column `descriptionComment` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "descriptionComment" TEXT NOT NULL;
