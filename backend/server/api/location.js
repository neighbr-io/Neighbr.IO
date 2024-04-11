const express = require("express");
const router = express.Router(); 
const authenticateToken = require("../middleware/authToken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", authenticateToken, async (req, res) => {
  // Extract location details
  const {
    businessName,
    houseNumber,
    aptSuiteOther,
    street,
    city,
    state,
    zipcode
  } = req.body;

  // Validate the required input data
  if (
    !businessName ||
    !houseNumber ||
    !street ||
    !city ||
    !state ||
    !zipcode
  ) {
    return res.status(400).send("Required project information is missing.");
  }

  try {
    const userRecord = await prisma.user.findUnique({
      where: { id: req.userId }, // Use req.userId set by authenticateToken
    });

    if (!userRecord) {
      return res.status(403).send("Only logged in user can start a projects.");
    }

    const newLocation = await prisma.location.create({
      data: {
        businessName,
        houseNumber,
        aptSuiteOther,
        street,
        city,
        state,
        zipcode
      },
    });

    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Failed to create new business location:", error);
    res.status(500).send("Error creating the business location.");
  }
});

module.exports = router;
