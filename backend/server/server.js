require('dotenv').config();
const express = require('express');
const projectsRoutes = require('./api/project');
const usersRoutes = require('./api/user');
const staticsRoutes = require('./api/static');
const authRoutes = require('./api/auth');

const app = express();
const port = 8000; 

app.use(express.json());

app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/static', staticsRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
