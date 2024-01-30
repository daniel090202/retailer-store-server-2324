-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_owner_fkey";

-- AlterTable
ALTER TABLE "coupons" ALTER COLUMN "owner" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_owner_fkey" FOREIGN KEY ("owner") REFERENCES "customers"("phone") ON DELETE SET NULL ON UPDATE CASCADE;
