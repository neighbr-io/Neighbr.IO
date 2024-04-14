const express = require("express");
const router = express.Router(); 
const authenticateToken = require("../middleware/authToken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/projects - Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        Category: true,
      }
    });

    const response = projects.map(project => ({
      ...project,
      category: project.Category.category,
      Category: undefined,
    }));
    res.json(response);
  } catch (error) {
    console.error("Failed to get projects:", error.message);
    res.status(500).json({ error: "Failed to get projects" });
  }
});

// POST /api/projects - Create new project, REQUIRE AUTH
router.post('/', authenticateToken, async (req, res) => {
    // Extract project details and the category name from request body
    const {
        title,
        subtitle,
        category, // This is the category name, not the ID
        story,
        faq,
        goal,
        expiration,
        priceTier1,
        rewardTier1,
        funded, // optional
        updates // optional
    } = req.body;

    // Validate the required input data
    if (!title || !subtitle || !category || !story || !goal || !expiration || !priceTier1 || !rewardTier1) {
        return res.status(400).send('Required project information is missing.');
    }

    try {
        const userRecord = await prisma.user.findUnique({
          where: { id: req.userId } // Use req.userId set by authenticateToken
        });
      
        if (!userRecord || (userRecord.accountTypeId !==3 && userRecord.accountTypeId !== 4)) {
          return res.status(403).send('Only users with a business profile can post projects.');
        }
        // Look up the categoryId from the Category table
        const categoryRecord = await prisma.category.findUnique({
          where: { category: category }
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
                priceTier1,
                rewardTier1,
                userId: req.userId // Use the user Id from the token to create userId
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

    const project = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Category: true,
      }
    });

    if (project) {
      const response = {
        ...project,
        category: project.Category.category,
      };
      delete response.Category;
      res.json(response);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error("Failed to get the project:", error);
    res.status(500).json({ error: "Failed to get the project" });
  }
});

// PUT /api/projects/:id - Update project status and FAQ, REQUIRE AUTH
// Look into how to make it append - @fangzi
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // Get the project ID from the URL parameters
  const { updates, faq } = req.body; // Extract only the fields allowed to be updated

  // Check if the updates or faq fields are provided
  if (updates === undefined && faq === undefined) {
      return res.status(400).send('No updates or FAQ information provided.');
  }

  try {
      // First, find the project by ID to verify the owner
      const project = await prisma.project.findUnique({
          where: { id: parseInt(id) },
      });

      // If no project is found or the userId does not match the authenticated user's id
      if (!project || project.userId !== req.userId) {
          return res.status(403).send('Unauthorized to update this project.');
      }

      // Proceed with the update since the user is authorized
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