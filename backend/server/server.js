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

app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  }));
  app.use(passport.authenticate('session'));

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
