// auth.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

// Route for email/password authentication
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ token });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

// Route for Google OAuth authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('http://localhost:8000/api/auth/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, issue token or redirect
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  }
);

// Logout route
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;