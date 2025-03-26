/*
  Warnings:

  - The `surgery` column on the `MedicalHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `injury` column on the `MedicalHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `familyHistory` column on the `MedicalHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allergies` column on the `MedicalHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MedicalHistory" DROP COLUMN "surgery",
ADD COLUMN     "surgery" TEXT[],
DROP COLUMN "injury",
ADD COLUMN     "injury" TEXT[],
DROP COLUMN "familyHistory",
ADD COLUMN     "familyHistory" TEXT[],
DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[];
