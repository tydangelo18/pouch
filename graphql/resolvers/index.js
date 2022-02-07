const getPouchesResolver = require("../resolvers/pouches/getPouches");
const getPouchResolver = require("../resolvers/pouches/getPouch");
const createPouchResolver = require("../resolvers/pouches/createPouch");
const deletePouchResolver = require("../resolvers/pouches/deletePouch");
const updatePouchResolver = require("../resolvers/pouches/updatePouch");
const createResourceResolver = require("../resolvers/pouches/resources/createResource");
const deleteResourceResolver = require("../resolvers/pouches/resources/deleteResource");
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
    ...deletePouchResolver.Mutation,
    ...createResourceResolver.Mutation,
    ...deleteResourceResolver.Mutation,
    ...updatePouchResolver.Mutation,
  },
};
