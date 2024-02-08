/*
  Warnings:

  - Added the required column `createdBy` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
