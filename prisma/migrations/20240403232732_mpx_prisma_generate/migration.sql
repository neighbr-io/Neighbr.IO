/*
  Warnings:

  - You are about to drop the column `projectId` on the `Location` table. All the data in the column will be lost.
  - Added the required column `role` to the `Waitlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_projectId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "projectId",
ALTER COLUMN "lat" DROP NOT NULL,
ALTER COLUMN "lon" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Waitlist" ADD COLUMN     "role" TEXT NOT NULL;
