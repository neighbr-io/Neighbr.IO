const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const { email } = req.body; 
  
    try {
      // Check if the email already exists
      const existingEmail = await prisma.waitlist.findUnique({
        where: { email },
      });
  
      if (existingEmail) {
        return res.status(400).send("Thanks for your interests! You are already on our waitlist!");
      }
  
      const waitlistEmail = await prisma.waitlist.create({
        data: {
          email,
        },
      });
  
      // Respond with the email
      res.status(201).json({
        message: "Email added to the waitlist successfully!",
        email: waitlistEmail.email // Return the added email to confirm creation
      });
    } catch (error) {
      console.error("Failed to join the waitlist:", error);
      res.status(500).send("Internal server error");
    }
});

module.exports = router;