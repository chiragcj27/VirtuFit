-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('STUDENT', 'WORKING_PROFESSIONAL', 'HOUSEWIFE', 'RETIRED', 'ON_BREAK');

-- CreateEnum
CREATE TYPE "WorkoutFrequency" AS ENUM ('DAILY', 'THREE_TIMES_PER_WEEK', 'TWO_TIMES_PER_WEEK', 'ONCE_PER_WEEK', 'OCCASIONAL', 'NEVER');

-- CreateEnum
CREATE TYPE "PhysicalActiveness" AS ENUM ('SEDENTARY', 'SLIGHTLY_ACTIVE', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "EatingHabits" AS ENUM ('HEALTHY', 'BAD', 'BALANCED');

-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('VEGAN', 'VEGETARIAN', 'NON_VEGETARIAN', 'EGGITARIAN');

-- CreateEnum
CREATE TYPE "Flexibility" AS ENUM ('HIGH', 'LOW', 'MEDIUM');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('LOSE_WEIGHT', 'GAIN_WEIGHT', 'BUILD_MUSCLE', 'IMPROVE_HEALTH', 'INCREASE_FLEXIBILITY');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePicture" TEXT,
    "phoneNumber" TEXT,
    "country" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender" NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "profession" "Profession" NOT NULL,
    "workoutFrequency" "WorkoutFrequency" NOT NULL,
    "physicalActiveness" "PhysicalActiveness" NOT NULL,
    "eatingHabits" "EatingHabits" NOT NULL,
    "dietType" "DietType" NOT NULL,
    "flexibility" "Flexibility" NOT NULL,
    "sleep" TEXT NOT NULL,
    "smoking" BOOLEAN NOT NULL,
    "alcoholConsumption" BOOLEAN NOT NULL,
    "workoutHistory" TEXT NOT NULL,
    "goal" "Goal" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyMeasurements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "chest" DOUBLE PRECISION NOT NULL,
    "waist" DOUBLE PRECISION NOT NULL,
    "hips" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BodyMeasurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "medicalCondition" TEXT[],
    "surgery" TEXT,
    "injury" TEXT,
    "familyHistory" TEXT,
    "allergies" TEXT,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BodyMeasurements_userId_key" ON "BodyMeasurements"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalHistory_userId_key" ON "MedicalHistory"("userId");

-- AddForeignKey
ALTER TABLE "BodyMeasurements" ADD CONSTRAINT "BodyMeasurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
