/*
  Warnings:

  - You are about to alter the column `servicePoster` on the `services` table. The data in that column could be lost. The data in that column will be cast from `VarBit` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "services" ALTER COLUMN "servicePoster" SET DATA TYPE VARCHAR(100);
