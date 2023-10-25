-- DropForeignKey
ALTER TABLE "itemService" DROP CONSTRAINT "itemService_id_fkey";

-- AlterTable
ALTER TABLE "itemService" ALTER COLUMN "nameItem" DROP NOT NULL,
ALTER COLUMN "idCategory" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "itemService" ADD CONSTRAINT "itemService_id_fkey" FOREIGN KEY ("id") REFERENCES "categoryService"("idCategory") ON DELETE NO ACTION ON UPDATE NO ACTION;
