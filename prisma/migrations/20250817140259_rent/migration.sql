/*
  Warnings:

  - The `Other_related_expenses` column on the `PropertyPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PropertyPost" ADD COLUMN     "Deposit_Rent" DOUBLE PRECISION,
ADD COLUMN     "Interest" DOUBLE PRECISION,
ALTER COLUMN "Deposit_Amount" DROP NOT NULL,
DROP COLUMN "Other_related_expenses",
ADD COLUMN     "Other_related_expenses" TEXT;

-- DropEnum
DROP TYPE "Other_related_expenses";
