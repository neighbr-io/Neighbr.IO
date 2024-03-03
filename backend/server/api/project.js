const express = require("express");
const router = express.Router(); 

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// GET /api/projects - Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    console.error("Failed to get projects:", error);
    res.status(500).json({ error: "Failed to get projects" });
  }
});

// GET /api/projects - Get project by id 
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error("Failed to get the project:", error);
    res.status(500).json({ error: "Failed to get the project" });
  }
});

module.exports = router;