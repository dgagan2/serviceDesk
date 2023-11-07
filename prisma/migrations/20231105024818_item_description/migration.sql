/*
  Warnings:

  - Added the required column `itemDescription` to the `itemService` table without a default value. This is not possible if the table is not empty.
  - Made the column `nameItem` on table `itemService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "itemService" ADD COLUMN     "itemDescription" TEXT NOT NULL,
ALTER COLUMN "nameItem" SET NOT NULL;

-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "itemDescription" TEXT;
