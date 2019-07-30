const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const connect = require('./src/services/database');
const schema = require('./src/utils/schema');
const context = require('./src/utils/context');

connect();

const server = new ApolloServer({
  schema,
  context
});

const app = express();
server.applyMiddleware({ app });

app.listen({port: 4000}, _ => {
  console.log(`Server ready at localhost:4000${server.graphqlPath}`);
});
