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

const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    profilePicture: z.string().optional(),
    phoneNumber: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.string().transform((str: string) => new Date(str)),
    gender: z.nativeEnum(Gender),
    height: z.number(),
    weight: z.number(),
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
        id: z.string().uuid(),
        date: z.string().transform((str: string) => new Date(str)),
        chest: z.number(),
        waist: z.number(),
        hips: z.number(),
        createdAt: z.string().transform((str: string) => new Date(str)),
      })
      .optional(),
    medicalHistory: z
      .object({
        id: z.string().uuid(),
        medicalCondition: z.array(z.string()),
        surgery: z.string().optional(),
        injury: z.string().optional(),
        familyHistory: z.string().optional(),
        allergies: z.string().optional(),
        createdAt: z.string().transform((str: string) => new Date(str)),
      })
      .optional(),
    goal: z.nativeEnum(Goal),
  });

  export default userSchema;