require('dotenv').config();
const express = require('express');
const projectsRoutes = require('./api/project');
const usersRoutes = require('./api/user');
const staticsRoutes = require('./api/static');
const authRoutes = require('./api/auth');
const transactionRoutes = require('./api/transaction');
const waitlistRoute = require('./api/waitlist');
const cors = require('cors');

const app = express();
const port = 8000; 
//added to resolve CORS error - connecting frontend to backend
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/static', staticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/waitlist', waitlistRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
