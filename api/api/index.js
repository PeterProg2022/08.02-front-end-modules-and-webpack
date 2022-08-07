//----------------------------
require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db');
const { installHandler } = require('./api_handler');

//----------------------------
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date');
const about = require('./about');
const issue = require('./issue');

const resolvers = {
  Query: {
    about: about.getMessage,
    issueList: issue.list,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
    issueAdd: issue.add,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('api/schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

//----------------------------

const port = process.env.API_SERVER_PORT || 3000;

const app = express();

(async function start() {
  try {
    await installHandler(app); // !!!!
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());

export default server;
