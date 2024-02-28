const express = require('express');
const connectDB = require('./db');
const app = require('./app');

const port =  5000;

// Connect to database
connectDB();
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});