//authToken.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token was found

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(401); // Token was invalid

    req.userId = user.userId;
    next(); // Token was valid, continue to the next middleware or route handler
  });
}

module.exports = authenticateToken;