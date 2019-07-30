const { gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author!
  }
  type Author {
    id: ID!
    name: String!
    age: Int!
  }
  input AuthorInput {
    name: String!
    age: Int!
  }
  type User {
    id: ID!
    userName: String!
    jwt: String
  }
  type Mutation {
    addBook(title: String!, author: AuthorInput!): Book
    signup(userName: String!, password: String!): User
    login(userName: String!, password: String!): User
  }
  type Query {
    getBook(id: ID!): Book
    getBooks: [Book]
    searchBooks(search: String!): [Book]
    currentUser: User
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
