import { z } from "zod";
import {
    Gender,
    Profession,
    WorkoutFrequency,
    PhysicalActiveness,
    EatingHabits,
    DietType,
    Flexibility,
    Goal,
  } from "@prisma/client";

const userDetailsSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    profilePicture: z.string().optional(),
    phoneNumber: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.string().transform((str: string) => new Date(str)),
    gender: z.nativeEnum(Gender),
    profession: z.nativeEnum(Profession),
    workoutFrequency: z.nativeEnum(WorkoutFrequency),
    physicalActiveness: z.nativeEnum(PhysicalActiveness),
    eatingHabits: z.nativeEnum(EatingHabits),
    dietType: z.nativeEnum(DietType),
    flexibility: z.nativeEnum(Flexibility),
    sleep: z.string(),
    smoking: z.boolean(),
    alcoholConsumption: z.boolean(),
    workoutHistory: z.string(),
    bodyMeasurements: z
      .object({
        chest: z.number(),
        waist: z.number(),
        hips: z.number(),
        height: z.number(),
        weight: z.number(),
      })
      .optional(),
    medicalHistory: z
      .object({
        medicalCondition: z.array(z.string()),
        surgery: z.array(z.string()),
        injury: z.array(z.string()),
        familyHistory: z.array(z.string()),
        allergies: z.array(z.string()),
      })
      .optional(),
    goal: z.nativeEnum(Goal),
  });

  export default userDetailsSchema;