/*
  Warnings:

  - Added the required column `paymentStatus` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipmentBarcode` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentStatus" INTEGER NOT NULL,
ADD COLUMN     "shipmentBarcode" TEXT NOT NULL,
ALTER COLUMN "counterID" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "coupons" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER,
    "barcode" INTEGER NOT NULL,
    "owner" TEXT NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL,
    "usageStatus" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "expiredIn" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "counters" (
    "id" SERIAL NOT NULL,
    "barcode" TEXT NOT NULL,
    "location" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipments" (
    "id" SERIAL NOT NULL,
    "barcode" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "deliveredDestination" TEXT NOT NULL,
    "deliveryCompany" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_barcode_key" ON "coupons"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "counters_barcode_key" ON "counters"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "shipments_barcode_key" ON "shipments"("barcode");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipmentBarcode_fkey" FOREIGN KEY ("shipmentBarcode") REFERENCES "shipments"("barcode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_counterID_fkey" FOREIGN KEY ("counterID") REFERENCES "counters"("barcode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_owner_fkey" FOREIGN KEY ("owner") REFERENCES "customers"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
