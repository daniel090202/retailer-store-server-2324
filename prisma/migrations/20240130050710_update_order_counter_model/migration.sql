-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipmentBarcode_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "shipmentBarcode" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipmentBarcode_fkey" FOREIGN KEY ("shipmentBarcode") REFERENCES "shipments"("barcode") ON DELETE SET NULL ON UPDATE CASCADE;
