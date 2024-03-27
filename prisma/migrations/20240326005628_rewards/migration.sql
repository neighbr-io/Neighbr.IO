/*
  Warnings:

  - Added the required column `priceTier1` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewardTier1` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "priceTier1" INTEGER NOT NULL,
ADD COLUMN     "priceTier2" INTEGER,
ADD COLUMN     "priceTier3" INTEGER,
ADD COLUMN     "rewardTier1" TEXT NOT NULL,
ADD COLUMN     "rewardTier2" TEXT,
ADD COLUMN     "rewardTier3" TEXT;
