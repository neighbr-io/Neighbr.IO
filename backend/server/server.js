require('dotenv').config();
const express = require('express');
const projectsRoutes = require('./api/project');
const usersRoutes = require('./api/user');
const staticsRoutes = require('./api/static');

const app = express();
const port = 8000; 

app.use(express.json());

app.use('/api', projectsRoutes);
app.use('/api', usersRoutes);
app.use('/api', staticsRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
