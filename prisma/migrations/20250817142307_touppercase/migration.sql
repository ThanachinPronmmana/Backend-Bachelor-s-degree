/*
  Warnings:

  - The values [Sell,Rent] on the enum `Sell_Rent` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sell_Rent_new" AS ENUM ('SELL', 'RENT');
ALTER TABLE "PropertyPost" ALTER COLUMN "Sell_Rent" TYPE "Sell_Rent_new" USING ("Sell_Rent"::text::"Sell_Rent_new");
ALTER TYPE "Sell_Rent" RENAME TO "Sell_Rent_old";
ALTER TYPE "Sell_Rent_new" RENAME TO "Sell_Rent";
DROP TYPE "Sell_Rent_old";
COMMIT;
