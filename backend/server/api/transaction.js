const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticateToken = require("../middleware/authToken");

// POST /api/transactions - write to the Transaction table with amount pledged
// The route also make updates to the Project table's funded field
// REQUIRE AUTH
router.post("/", async (req, res) => {
  const { amount, projectId, userId } = req.body; // add more fields as needed

  try {
    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        projectId,
        userId,
      },
    });

    // Calculate the new sum of transactions for the project
    const totalFunded = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        projectId: projectId,
        // Include additional conditions if necessary, such as status: 'completed'
      },
    });

    // Update the funded amount in the project
    const projectUpdate = await prisma.project.update({
      where: { id: projectId },
      data: { funded: totalFunded._sum.amount || 0 },
    });

    // Send a response back
    res.json({ transaction: transaction, projectUpdate: projectUpdate });
  } catch (error) {
    console.error("An error occurred: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

// GET transactions based on projectId(s). Can be used to support transaction level business user dashboard
// The endpoint can take multiple projectIds with query parameters
// Example:    GET /aip/transactions?projectIds=1,2,3
// REQUIRE AUTH
router.get("/", async (req, res) => {
  const { projectIds } = req.query; // "projectIds" should be a comma-separated string

  // Convert the projectIds string to an array of integers
  const projectIdArray = projectIds.split(",").map((id) => parseInt(id.trim()));

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        projectId: {
          in: projectIdArray, 
        },
      },
      orderBy: {
        createdAt: "desc", // Newest transactions first
      },
    });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .send("Error retrieving transactions for the provided project IDs.");
  }
});

//Support business users to see transactions level detail for each project
router.get("/:projectId", authenticateToken, async (req, res) => {
  const projectId = parseInt(req.params.projectId);
  const userId = req.userId;

  try {
    // First, verify that the project belongs to the authenticated user
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return res.status(404).send("Project not found.");
    }

    if (project.userId !== userId) {
      return res.status(403).send("Unauthorized access - This project does not belong to the authenticated user.");
    }

    // Fetch transactions for the project
    const transactions = await prisma.transaction.findMany({
      where: {
        projectId: projectId,
      },
    });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
