const { ApolloServer, makeExecutableSchema } = require('apollo-server');

// Schema
const typeDefs = require('./schema');

// Resolvers
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema });

server.listen(4001).then(({ url }) => {
  console.log(`Graphql server ready at ${url}`);
});
