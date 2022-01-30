const pouchesResolvers = require("./pouches");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...pouchesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
