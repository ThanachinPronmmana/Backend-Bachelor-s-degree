/*
  Warnings:

  - You are about to drop the column `Occaaption` on the `Buyer` table. All the data in the column will be lost.
  - You are about to drop the column `buyerId` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `buyerId` on the `DocumentUpload` table. All the data in the column will be lost.
  - You are about to drop the column `buyerId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `PropertyPost` table. All the data in the column will be lost.
  - You are about to drop the column `propertyTypeId` on the `PropertyPost` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `PropertyPost` table. All the data in the column will be lost.
  - You are about to drop the `Setdatetime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `DocumentUrl` to the `DocumentUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DocumentUpload` table without a default value. This is not possible if the table is not empty.
  - Changed the column `Nearby_Landmarks` on the `PropertyPost` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.
  - Changed the column `Additional_Amenities` on the `PropertyPost` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- CreateEnum
CREATE TYPE "Status_post" AS ENUM ('PENDING', 'CONFIRMED');

-- DropForeignKey
ALTER TABLE "Deposit" DROP CONSTRAINT "Deposit_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentUpload" DROP CONSTRAINT "DocumentUpload_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentUpload" DROP CONSTRAINT "DocumentUpload_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_propertyPostId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyPost" DROP CONSTRAINT "PropertyPost_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyPost" DROP CONSTRAINT "PropertyPost_locationId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyPost" DROP CONSTRAINT "PropertyPost_propertyTypeId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyPost" DROP CONSTRAINT "PropertyPost_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Setdatetime" DROP CONSTRAINT "Setdatetime_sellerId_fkey";

-- DropIndex
DROP INDEX "PropertyPost_sellerId_key";

-- DropIndex
DROP INDEX "PropertyPost_userId_key";

-- AlterTable
ALTER TABLE "Buyer" DROP COLUMN "Occaaption",
ADD COLUMN     "Occupation" TEXT;

-- AlterTable
ALTER TABLE "Deposit" DROP COLUMN "buyerId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "DocumentUpload" DROP COLUMN "buyerId",
ADD COLUMN     "CloudinaryPublicId" TEXT,
ADD COLUMN     "DocumentUrl" TEXT NOT NULL,
ADD COLUMN     "postId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "typeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "buyerId",
DROP COLUMN "sellerId",
ALTER COLUMN "asset_id" DROP NOT NULL,
ALTER COLUMN "public_id" DROP NOT NULL,
ALTER COLUMN "secure_url" DROP NOT NULL,
ALTER COLUMN "propertyPostId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PropertyPost" DROP COLUMN "locationId",
DROP COLUMN "propertyTypeId",
DROP COLUMN "sellerId",
ADD COLUMN     "Status_post" "Status_post" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "Latitude" DROP NOT NULL,
ALTER COLUMN "Longitude" DROP NOT NULL,
-- ALTER COLUMN "Nearby_Landmarks" SET DATA TYPE "Nearby_Landmarks_list"[],
-- ALTER COLUMN "Additional_Amenities" SET DATA TYPE "Additional_Amenities_list"[],
-- migration.sql (หลังแก้ไข)
ALTER COLUMN "Name" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;
-- AlterTable
ALTER TABLE "PropertyPost" ALTER COLUMN "Nearby_Landmarks" SET DATA TYPE "Nearby_Landmarks_list"[] USING ARRAY["Nearby_Landmarks"::"Nearby_Landmarks_list"];
ALTER TABLE "PropertyPost" ALTER COLUMN "Additional_Amenities" SET DATA TYPE "Additional_Amenities_list"[] USING ARRAY["Additional_Amenities"::"Additional_Amenities_list"];

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "propertyPostId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "publicId" TEXT;

-- DropTable
DROP TABLE "Setdatetime";

-- CreateTable
CREATE TABLE "Datetime" (
    "id" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "Month" TEXT NOT NULL,
    "Year" TEXT NOT NULL,
    "Time" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Datetime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_propertyPostId_fkey" FOREIGN KEY ("propertyPostId") REFERENCES "PropertyPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyPost" ADD CONSTRAINT "PropertyPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpload" ADD CONSTRAINT "DocumentUpload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpload" ADD CONSTRAINT "DocumentUpload_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DocumentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpload" ADD CONSTRAINT "DocumentUpload_postId_fkey" FOREIGN KEY ("postId") REFERENCES "PropertyPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_propertyPostId_fkey" FOREIGN KEY ("propertyPostId") REFERENCES "PropertyPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datetime" ADD CONSTRAINT "Datetime_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
