//server.js

require('dotenv').config();
const express = require('express');
const projectsRoutes = require('./api/project');
const usersRoutes = require('./api/user');
const staticsRoutes = require('./api/static');
const authRoutes = require('./api/auth');
const transactionRoutes = require('./api/transaction');
const waitlistRoute = require('./api/waitlist');
const stripeRoutes = require('./api/stripe');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport-config'); // Import initializePassport function
const SQLiteStore = require('connect-sqlite3')(session);

const app = express();
const port = 8000; 
//added to resolve CORS error - connecting frontend to backend
app.use(cors());
app.use(express.json());

const fs = require('fs');
const path = require('path');

const dbDirectory = path.join(__dirname, 'var', 'db');

// Check if the directory exists, create it if it doesn't
if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
}

app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // store: new SQLiteStore({ db: 'sessions.db', dir: path.join(__dirname, 'var', 'db') })
  }));

initializePassport();

app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.authenticate('session'));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/static', staticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/waitlist', waitlistRoute);
app.use('/api/stripe', stripeRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


