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

const app = express();
const port = 8000; 
//added to resolve CORS error - connecting frontend to backend
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  }));
  app.use(passport.authenticate('session'));

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


