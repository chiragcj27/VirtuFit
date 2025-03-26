import { Router } from "express";
import userDetailsSchema from "../../zodSchemas/userSchema";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const router = Router();
const prisma = new PrismaClient();

// Define a route to get details
router.get("/", (req, res) => {
  // Logic to get details
  res.send("Details fetched successfully");
});

router.post("/storeDetail", async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    let userData;
    try {
      userData = userDetailsSchema.parse(req.body);
    } catch (validationError) {
      res.status(400).json({ message: "Invalid request data", error: (validationError as z.ZodError).errors });
      return;
    }
    // Update the user record with the provided details
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(userData.email && { email: userData.email }),
        ...(userData.password && { password: userData.password }),
        ...(userData.name && { name: userData.name }),
        ...(userData.profilePicture && { profilePicture: userData.profilePicture }),
        ...(userData.phoneNumber && { phoneNumber: userData.phoneNumber }),
        ...(userData.country && { country: userData.country }),
        ...(userData.dateOfBirth && { dateOfBirth: userData.dateOfBirth }),
        ...(userData.gender && { gender: userData.gender }),
        ...(userData.profession && { profession: userData.profession }),
        ...(userData.workoutFrequency && { workoutFrequency: userData.workoutFrequency }),
        ...(userData.physicalActiveness && { physicalActiveness: userData.physicalActiveness }),
        ...(userData.eatingHabits && { eatingHabits: userData.eatingHabits }),
        ...(userData.dietType && { dietType: userData.dietType }),
        ...(userData.flexibility && { flexibility: userData.flexibility }),
        ...(userData.sleep && { sleep: userData.sleep }),
        ...(userData.smoking !== undefined && { smoking: userData.smoking }), // Boolean fields need explicit checks
        ...(userData.alcoholConsumption !== undefined && { alcoholConsumption: userData.alcoholConsumption }),
        ...(userData.workoutHistory && { workoutHistory: userData.workoutHistory }),
        ...(userData.goal && { goal: userData.goal }),
    
        // Handle nested relations for bodyMeasurements
        ...(userData.bodyMeasurements && {
          bodyMeasurements: {
            create: userData.bodyMeasurements,
          },
        }),
    
        // Handle nested relations for medicalHistory
        ...(userData.medicalHistory && {
          medicalHistory: {
            create: userData.medicalHistory,
          },
        }),
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in /storeDetail:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "An error occurred" });
  }
});
export default router;
