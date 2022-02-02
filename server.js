const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const { MONGODB } = require("./config/config");

// Apollo Server Instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context = { ...auth header }
  // Take the request body and will forward it to the auth variable to access for our auth middleware for protected routes
  // this is to access the auth headers to make sure the user is authenticated to perform protected methods
  context: ({ req }) => ({ req }),
  uploads: false,
});

// Database Connection
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
