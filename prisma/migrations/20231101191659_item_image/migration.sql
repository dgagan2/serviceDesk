/*
  Warnings:

  - Made the column `itemImage` on table `itemService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "itemService" ALTER COLUMN "itemImage" SET NOT NULL;
