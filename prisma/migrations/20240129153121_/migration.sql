/*
  Warnings:

  - You are about to drop the column `SKU` on the `products` table. All the data in the column will be lost.
  - Added the required column `productID` to the `productDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "productDetails" DROP CONSTRAINT "productDetails_SKU_fkey";

-- DropIndex
DROP INDEX "products_SKU_key";

-- AlterTable
ALTER TABLE "productDetails" ADD COLUMN     "productID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "SKU";

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_productID_fkey" FOREIGN KEY ("productID") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
