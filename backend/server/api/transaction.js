const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticateToken = require("../middleware/authToken");

// POST /api/transactions - write to the Transaction table with amount pledged
// The route also make updates to the Project table's funded field
// Update with virtual column (pulling from transaction table)
// REQUIRE AUTH
router.post("/", authenticateToken, async (req, res) => {
  const { amount, projectId, createdAt } = req.body; // add more fields as needed

  try {
    const userRecord = await prisma.user.findUnique({
      where: { id: req.userId }, // Use req.userId set by authenticateToken
    });

    if (!userRecord) {
      return res.status(403).send("Only registered user can pledge.");
    }
    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        projectId,
        createdAt,
        userId: req.userId,
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
    // Will not need this block of code once 'funded' is converted to virtual
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

// GET /api/transactions - Get all transactions or transactions based on projectId(s)
// REQUIRE AUTH
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userRecord = await prisma.user.findUnique({
      where: { id: req.userId }, // Use req.userId set by authenticateToken
    });

    if (!userRecord) {
      return res.status(403).send("Only authenticated user can view transactions.");
    }

    const { projectIds } = req.query;
    if (projectIds) {
      // If projectIds provided, fetch transactions for the provided projectIds
      const projectIdArray = projectIds.split(",").map((id) => parseInt(id.trim()));
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
    } else {
      // If no projectIds provided, fetch all transactions for the authenticated user
      const transactions = await prisma.transaction.findMany({
        where: {
          userId: req.userId,
        },
      });
      res.json(transactions);
    }
  } catch (error) {
    console.error("Failed to get transactions:", error);
    res.status(500).json({ error: "Failed to get transactions" });
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
      return res
        .status(403)
        .send(
          "Unauthorized access - This project does not belong to the authenticated user."
        );
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