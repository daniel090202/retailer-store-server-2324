/*
  Warnings:

  - You are about to drop the column `category` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `type` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "category",
ADD COLUMN     "type" INTEGER NOT NULL;
