/*
  Warnings:

  - You are about to drop the column `productID` on the `productDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UPC]` on the table `productDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[SKU]` on the table `productDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UPC]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UPC` to the `productDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "productDetails" DROP CONSTRAINT "productDetails_productID_fkey";

-- AlterTable
ALTER TABLE "productDetails" DROP COLUMN "productID",
ADD COLUMN     "UPC" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "productDetails_UPC_key" ON "productDetails"("UPC");

-- CreateIndex
CREATE UNIQUE INDEX "productDetails_SKU_key" ON "productDetails"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "products_UPC_key" ON "products"("UPC");

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_UPC_fkey" FOREIGN KEY ("UPC") REFERENCES "products"("UPC") ON DELETE RESTRICT ON UPDATE CASCADE;
