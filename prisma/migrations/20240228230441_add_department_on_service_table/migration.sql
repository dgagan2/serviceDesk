-- AlterTable
ALTER TABLE "services" ADD COLUMN     "idDepartment" SMALLINT;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_idDepartment_fkey" FOREIGN KEY ("idDepartment") REFERENCES "department"("idDepartment") ON DELETE NO ACTION ON UPDATE NO ACTION;
