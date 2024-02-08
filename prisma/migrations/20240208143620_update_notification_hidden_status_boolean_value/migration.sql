/*
  Warnings:

  - You are about to drop the column `status` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `hiddenStatus` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "status",
ADD COLUMN     "hiddenStatus" BOOLEAN NOT NULL;
