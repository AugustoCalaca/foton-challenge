const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');

const connect = require('./src/services/database');
const schema = require('./src/utils/schema');
const context = require('./src/utils/context');

connect();
const PORT = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
  schema,
  context
});

const app = express();
apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({port: PORT}, _ => {
  console.log(`Server ready at localhost:${PORT}${apolloServer.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
});
