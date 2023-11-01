/*
  Warnings:

  - Made the column `idCategory` on table `itemService` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "itemService" DROP CONSTRAINT "itemService_id_fkey";

-- AlterTable
ALTER TABLE "itemService" ALTER COLUMN "idCategory" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "itemService" ADD CONSTRAINT "itemService_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "categoryService"("idCategory") ON DELETE NO ACTION ON UPDATE NO ACTION;
