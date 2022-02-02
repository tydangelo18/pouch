const getPouchesResolver = require("../resolvers/pouches/getPouches");
const getPouchResolver = require("../resolvers/pouches/getPouch");
const createPouchResolver = require("../resolvers/pouches/createPouch");
const registerResolver = require("./users/register");
const loginResolver = require("./users/login");

module.exports = {
  Query: {
    ...getPouchesResolver.Query,
    ...getPouchResolver.Query,
  },
  Mutation: {
    ...registerResolver.Mutation,
    ...loginResolver.Mutation,
    ...createPouchResolver.Mutation,
  },
};
