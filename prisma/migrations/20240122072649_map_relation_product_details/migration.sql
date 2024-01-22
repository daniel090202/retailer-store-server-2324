/*
  Warnings:

  - You are about to drop the `ProductDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_SKU_fkey";

-- DropTable
DROP TABLE "ProductDetail";

-- CreateTable
CREATE TABLE "productDetails" (
    "id" SERIAL NOT NULL,
    "SKU" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "initialInventory" INTEGER NOT NULL,
    "minimumInventory" INTEGER NOT NULL,
    "maximumInventory" INTEGER NOT NULL,
    "remainInventory" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_SKU_fkey" FOREIGN KEY ("SKU") REFERENCES "products"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;
