/*
  Warnings:

  - Made the column `nameItem` on table `itemService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idCategory` on table `itemService` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "itemService" DROP CONSTRAINT "itemService_id_fkey";

-- AlterTable
ALTER TABLE "itemService" ALTER COLUMN "nameItem" SET NOT NULL,
ALTER COLUMN "idCategory" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "itemService" ADD CONSTRAINT "itemService_id_fkey" FOREIGN KEY ("id") REFERENCES "categoryService"("idCategory") ON DELETE RESTRICT ON UPDATE CASCADE;
