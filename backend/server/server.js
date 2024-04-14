

require('dotenv').config();
const express = require('express');
const path = require('path');
const projectsRoutes = require('./api/project');
const usersRoutes = require('./api/user');
const staticsRoutes = require('./api/static');
const authRoutes = require('./api/auth');
const transactionRoutes = require('./api/transaction');
const waitlistRoute = require('./api/waitlist');
const stripeRoutes = require('./api/stripe');
const locationRoute = require('./api/location');
const cors = require('cors');

const app = express();
const port = 8000; 
//added to resolve CORS error - connecting frontend to backend
app.use(cors());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "dist")));
app.use('/api', apiRouter);

app.use('/api/static', staticsRoutes);
app.use('/api/waitlist', waitlistRoute);
app.use('/api/projects', projectsRoutes);
app.use('/api/location', locationRoute);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/stripe', stripeRoutes);


app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});
