import express from "express";
import { OpenAI } from "openai";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// OpenAI API Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.deepseek.com'   
});

router.post("/generate", async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    // Step 1: Retrieve user data from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        bodyMeasurements: true,
        medicalHistory: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Step 2: Format the data for the prompt
    const prompt = `
      Generate a personalized health and fitness report for the following user:
      Name: ${user.name}
      Email: ${user.email}
      Gender: ${user.gender}
      Profession: ${user.profession}
      Workout Frequency: ${user.workoutFrequency}
      Physical Activeness: ${user.physicalActiveness}
      Eating Habits: ${user.eatingHabits}
      Diet Type: ${user.dietType}
      Flexibility: ${user.flexibility}
      Sleep: ${user.sleep}
      Smoking: ${user.smoking ? "Yes" : "No"}
      Alcohol Consumption: ${user.alcoholConsumption ? "Yes" : "No"}
      Workout History: ${user.workoutHistory}
      Goal: ${user.goal}

      Body Measurements:
      ${user.bodyMeasurements
        .map(
          (bm) =>
            `- Date: ${bm.createdAt.toISOString()}, Height: ${bm.height} cm, Weight: ${bm.weight} kg, Chest: ${bm.chest} cm, Waist: ${bm.waist} cm, Hips: ${bm.hips} cm`
        )
        .join("\n")}

      Medical History:
      ${user.medicalHistory
        .map(
          (mh) =>
            `- Date: ${mh.createdAt.toISOString()}, Medical Conditions: ${mh.medicalCondition.join(
              ", "
            )}, Surgeries: ${mh.surgery.join(", ")}, Injuries: ${mh.injury.join(
              ", "
            )}, Family History: ${mh.familyHistory.join(
              ", "
            )}, Allergies: ${mh.allergies.join(", ")}`
        )
        .join("\n")}

      Based on this information, provide a detailed report with recommendations for achieving the user's goal.
    `;

    // Step 3: Call OpenAI API to generate the report
    const response = await openai.chat.completions.create({
      model: "text-davinci-003", // Use a GPT model
        messages: [{ role: "system", content: prompt }],
      max_tokens: 1500,
    });

    // Step 4: Return the generated report
    res.status(200).json({ report: response.choices[0].message.content});
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "An error occurred while generating the report" });
  }
});

export default router;