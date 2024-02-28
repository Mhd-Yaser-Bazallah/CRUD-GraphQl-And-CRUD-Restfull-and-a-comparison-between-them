const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemaa');
const connectDB = require('./db');

const port =  5000;

const app = express();

// Connect to database
connectDB();


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
