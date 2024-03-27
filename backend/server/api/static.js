// Theese routes are for admin account only

const express = require("express");
const router = express.Router(); 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get project categories, such as Coffee Shop, Bookbstore
router.get("/category", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error("Failed to get categories:", error);
    res.status(500).json({ error: "Failed to get categories" });
  }
});

// Get account types
router.get("/AccountType", async (req, res) => {
    try {
      const accountTypes = await prisma.AccountType.findMany();
      res.json(accountTypes);
    } catch (error) {
      console.error("Failed to get account types:", error);
      res.status(500).json({ error: "Failed to get account types" });
    }
  });

// PUT or POST - optional, admin can add/update/delete from source table

module.exports = router;