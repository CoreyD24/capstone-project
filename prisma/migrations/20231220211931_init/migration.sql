/*
  Warnings:

  - You are about to alter the column `total_price` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "total_price" SET DEFAULT 0.00,
ALTER COLUMN "total_price" SET DATA TYPE DOUBLE PRECISION;
