const pouchesResolvers = require("./pouches");

module.exports = {
  Query: {
    ...pouchesResolvers.Query,
  },
};
