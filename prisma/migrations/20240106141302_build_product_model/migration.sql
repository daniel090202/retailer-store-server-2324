-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "SKU" TEXT NOT NULL,
    "UPC" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "forGender" INTEGER NOT NULL,
    "category" INTEGER[],
    "size" TEXT[],
    "color" TEXT[],
    "originalPrice" INTEGER NOT NULL,
    "salePrice" INTEGER NOT NULL,
    "unit" INTEGER NOT NULL,
    "initialInventory" INTEGER NOT NULL,
    "minimumInventory" INTEGER NOT NULL,
    "maximumInventory" INTEGER NOT NULL,
    "remainInventory" INTEGER NOT NULL,
    "soldQuantity" INTEGER NOT NULL,
    "storageLocation" INTEGER[],
    "displayLocation" INTEGER[],
    "active" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_SKU_key" ON "products"("SKU");
