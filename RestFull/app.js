const express = require('express');
const clientRoutet = require('./client_router');
const projectRoutet = require('./project_router');

const app = express();
app.use('/api/v1/client', clientRoutet);
app.use('/api/v1/project', projectRoutet);

module.exports = app;
