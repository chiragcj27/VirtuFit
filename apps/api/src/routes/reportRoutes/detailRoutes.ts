import { Router } from "express";
import userSchema from "../../zodSchemas/userSchema";
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
    const user = userSchema.parse(req.body.user);

    await prisma.user.create({
      data: {
        ...user,
        bodyMeasurements: user.bodyMeasurements
          ? {
              create: {
                ...user.bodyMeasurements,
              },
            }
          : undefined,
        medicalHistory: user.medicalHistory
          ? {
              create: {
                ...user.medicalHistory,
              },
            }
          : undefined,
      },
    });

    res.status(200).send("Database populated successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .send({ error: "Validation error", details: error.errors });
    } else {
      console.error(error);
      res.status(500).send("An error occurred while populating the database");
    }
  }
});

export default router;
