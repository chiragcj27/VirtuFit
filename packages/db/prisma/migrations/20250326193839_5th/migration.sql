/*
  Warnings:

  - You are about to drop the column `height` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `User` table. All the data in the column will be lost.
  - Added the required column `height` to the `BodyMeasurements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `BodyMeasurements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BodyMeasurements" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "height",
DROP COLUMN "weight";
