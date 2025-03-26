-- DropIndex
DROP INDEX "BodyMeasurements_userId_key";

-- DropIndex
DROP INDEX "MedicalHistory_userId_key";

-- AlterTable
ALTER TABLE "BodyMeasurements" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MedicalHistory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
