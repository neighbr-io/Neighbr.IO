const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authToken");

require("dotenv").config();

// register a new user with email and password
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

// User dashboard 1 - pledger summary
router.get("/transaction/summary", authenticateToken, async (req, res) => {
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

    const projectIds = transactionAggregates.map(t => t.projectId);
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
    const result = transactionAggregates.map(summary => ({
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

// User dashboard 2 - business summary

module.exports = router;
