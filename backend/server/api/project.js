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

// POST /api/projects - Create new project, REQUIRE AUTH
router.post('/', async (req, res) => {
    // Extract project details and the category name from request body
    const {
        title,
        subtitle,
        category, // This is the category name, not the ID
        story,
        faq,
        goal,
        expiration,
        userId,
        funded, // optional
        updates // optional
    } = req.body;

    // Validate the required input data
    if (!title || !subtitle || !category || !story || !goal || !expiration || !userId) {
        return res.status(400).send('Required project information is missing.');
    }

    try {
        // Look up the categoryId from the Category table
        const categoryRecord = await prisma.category.findUnique({
            where: { category }
        });

        if (!categoryRecord) {
            return res.status(404).send('Category not found.');
        }

        const newProject = await prisma.project.create({
            data: {
                title,
                subtitle,
                categoryId: categoryRecord.id, // Use the looked-up ID
                story,
                faq,
                updates: updates || "", // Default updates to an empty string if not provided
                goal,
                funded: funded || 0, // Default funded to 0 if not provided
                expiration: new Date(expiration),
                userId
            }
        });

        res.status(201).json(newProject);
    } catch (error) {
        console.error('Failed to create new project:', error);
        res.status(500).send('Error creating the project.');
    }
});

// GET /api/projects/:id - Get project by id 
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

// PUT /api/projects/:id - Update project status and FAQ, REQUIRE AUTH
router.put('/projects/:id', async (req, res) => {
  const { id } = req.params; // Get the project ID from the URL parameters
  const { updates, faq } = req.body; // Extract only the fields allowed to be updated

  // Check if the updates or faq fields are provided
  if (updates === undefined && faq === undefined) {
      return res.status(400).send('No updates or FAQ information provided.');
  }

  try {
      // Find the project by ID and update the 'updates' and/or 'faq' fields
      const updatedProject = await prisma.project.update({
          where: { id: parseInt(id) },
          data: {
              ...(updates !== undefined && { updates }), // Conditionally add updates to the data object if provided
              ...(faq !== undefined && { faq }), // Conditionally add faq to the data object if provided
          }
      });

      // If the project is successfully updated, return the updated project data
      res.json(updatedProject);
  } catch (error) {
      // If the project is not found or any other error occurs, send an appropriate response
      if (error.code === 'P2025') {
          // Prisma's error code for "Record to update not found."
          return res.status(404).send('Project not found.');
      } else {
          console.error('Failed to update the project:', error);
          res.status(500).send('Error updating the project.');
      }
  }
});

module.exports = router;