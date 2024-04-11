const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authToken");

require("dotenv").config();

// POST /api/users/register - register a new user with email and password
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).send("User already exists with this email.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with accountTypeId set to 2 by default
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        accountTypeId: 2, // Default accountTypeId
      },
    });

    // Respond with the created user (excluding password)
    const { password: _, ...userData } = user;
    res.status(201).json(userData);
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(500).send("Internal server error");
  }
});

// GET /api/users - Get all users
router.get("/", authenticateToken, async (req, res) => {
  try {
    // First, verify the user's role
    const userRecord = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!userRecord || userRecord.accountTypeId !== 1) {
      // If user does not exist or is not an admin, return error
      return res.status(403).send("Access denied. Admins only.");
    }

    // If the user is an admin, proceed to fetch all users
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
});


// GET /api/users/me - return the currently logged in user
router.get("/me", authenticateToken, async (req, res) => {
  try {
    
    const userId = req.userId;

    if (!userId) {
      return res.status(400).send("User ID is missing.");
    }

    const me = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!me) {
      return res.status(404).send("User not found.");
    }

    res.json(me);
  } catch (error) {
    console.error("Failed to get user:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// GET /api/users/transaction/summary - User dashboard 1 pledger summary, REQUIRE AUTH
router.get("/transactions", authenticateToken, async (req, res) => {
  const userId = req.userId;

  try {
    const transactionAggregates = await prisma.transaction.groupBy({
      by: ["projectId"],
      _sum: {
        amount: true,
      },
      where: {
        userId: userId,
      },
    });

    const projectIds = transactionAggregates.map((t) => t.projectId);
    const projects = await prisma.project.findMany({
      where: {
        id: {
          in: projectIds,
        },
      },
      select: {
        id: true,
        title: true,
      },
    });

    // Create a map of projectIds to titles
    const projectTitleMap = projects.reduce((map, project) => {
      map[project.id] = project.title;
      return map;
    }, {});

    // Enrich the transaction aggregates with project titles
    const result = transactionAggregates.map((summary) => ({
      projectId: summary.projectId,
      sum: summary._sum.amount,
      title: projectTitleMap[summary.projectId] || "No title",
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching transaction summaries:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /api/users/project - User dashboard 2 business summary, REQUIRE AUTH
router.get("/projects", authenticateToken, async (req, res) => {
  const userId = req.userId;

  try {
    const userProjects = await prisma.project.findMany({
      where: {
        userId: userId, // Filters projects to those belonging to the logged-in user
      },
      select: {
        title: true, 
        goal: true, 
        funded: true, 
        expiration: true, 
      },
    });

    // Respond with the retrieved projects
    res.json(userProjects);
  } catch (error) {
    console.error("error:", error);
  }
});

module.exports = router;
