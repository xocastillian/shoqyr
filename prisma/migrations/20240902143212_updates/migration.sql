/*
  Warnings:

  - Added the required column `token` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "totalAmount" INTEGER NOT NULL DEFAULT 0;
