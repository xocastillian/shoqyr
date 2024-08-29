/*
  Warnings:

  - Made the column `sportTypeId` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trackingNumber` on table `ShippingInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shippingDate` on table `ShippingInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deliveryDate` on table `ShippingInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sportTypeId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "sportTypeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ShippingInfo" ALTER COLUMN "trackingNumber" SET NOT NULL,
ALTER COLUMN "shippingDate" SET NOT NULL,
ALTER COLUMN "deliveryDate" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sportTypeId_fkey" FOREIGN KEY ("sportTypeId") REFERENCES "SportType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
