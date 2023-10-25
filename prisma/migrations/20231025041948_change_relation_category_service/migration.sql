/*
  Warnings:

  - You are about to drop the column `idItem` on the `categoryService` table. All the data in the column will be lost.
  - Made the column `creationDate` on table `ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "itemService" DROP CONSTRAINT "itemService_id_fkey";

-- DropIndex
DROP INDEX "idItem";

-- AlterTable
ALTER TABLE "categoryService" DROP COLUMN "idItem";

-- AlterTable
ALTER TABLE "ticket" ALTER COLUMN "creationDate" SET NOT NULL,
ALTER COLUMN "creationDate" SET DEFAULT CURRENT_DATE;

-- AddForeignKey
ALTER TABLE "itemService" ADD CONSTRAINT "itemService_id_fkey" FOREIGN KEY ("id") REFERENCES "categoryService"("idCategory") ON DELETE NO ACTION ON UPDATE NO ACTION;
