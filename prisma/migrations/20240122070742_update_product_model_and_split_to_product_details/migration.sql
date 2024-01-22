-- CreateTable
CREATE TABLE "ProductDetail" (
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

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_SKU_fkey" FOREIGN KEY ("SKU") REFERENCES "products"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;
