const pouchesResolvers = require("./pouches");
const registerResolver = require("./users/register");
const loginResolver = require("./users/login");

module.exports = {
  Query: {
    ...pouchesResolvers.Query,
  },
  Mutation: {
    ...registerResolver.Mutation,
    ...loginResolver.Mutation,
  },
};
