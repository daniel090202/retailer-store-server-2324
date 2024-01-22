/*
  Warnings:

  - You are about to drop the column `color` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `displayLocation` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `initialInventory` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `maximumInventory` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `minimumInventory` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `remainInventory` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `soldQuantity` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `storageLocation` on the `products` table. All the data in the column will be lost.
  - Added the required column `soldQuantity` to the `productDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productDetails" ADD COLUMN     "displayLocation" INTEGER[],
ADD COLUMN     "soldQuantity" INTEGER NOT NULL,
ADD COLUMN     "storageLocation" INTEGER[];

-- AlterTable
ALTER TABLE "products" DROP COLUMN "color",
DROP COLUMN "displayLocation",
DROP COLUMN "initialInventory",
DROP COLUMN "maximumInventory",
DROP COLUMN "minimumInventory",
DROP COLUMN "remainInventory",
DROP COLUMN "size",
DROP COLUMN "soldQuantity",
DROP COLUMN "storageLocation";
