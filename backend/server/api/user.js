// Routes to access users

const express = require("express");
const router = express.Router(); 

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

require('dotenv').config(); 

// register a new user with email and password
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return res.status(400).send('User already exists with this email.');
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
      console.error('Failed to register user:', error);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;
