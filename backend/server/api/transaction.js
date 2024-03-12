const express = require("express");
const router = express.Router(); 

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// POST to Transaction table with amount pledged and update (PUT) to Project table funded field accordingly 

router.post('/transaction', async (req, res) => {
    
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
      res.status(500).json({ error: "An error occurred while processing your request." });
    }
  });
  
  module.exports = router;