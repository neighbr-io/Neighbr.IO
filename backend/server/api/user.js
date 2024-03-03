// Routes to access users

const express = require("express");
const router = express.Router(); 

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrpty = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 




module.exports = router;
