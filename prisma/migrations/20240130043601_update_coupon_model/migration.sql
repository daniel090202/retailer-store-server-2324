/*
  Warnings:

  - You are about to drop the column `orderId` on the `coupons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_orderId_fkey";

-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "orderId",
ADD COLUMN     "orderID" INTEGER;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
