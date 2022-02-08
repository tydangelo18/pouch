const Pouch = require("../../../../models/Pouch");
const authCheck = require("../../../../utils/auth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async updateResource(_, { pouchId, resourceId, link }, context) {
      const user = authCheck(context);

      const pouch = await Pouch.findById(pouchId);

      if (pouch) {
        const resourceIndex = pouch.resources.findIndex(
          (c) => c.id === resourceId
        );

        if (pouch.resources[resourceIndex].email === user.email) {
          pouch.resources[resourceIndex].link = link;
          await pouch.save();
          return pouch;
        } else {
          throw new AuthenticationError("Cannot update resource");
        }
      } else {
        throw new UserInputError("Resource not found");
      }
    },
  },
};
