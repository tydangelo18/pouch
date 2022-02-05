const Pouch = require("../../../../models/Pouch");
const authCheck = require("../../../../utils/auth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async deleteResource(_, { pouchId, resourceId }, context) {
      const user = authCheck(context);

      const pouch = await Pouch.findById(pouchId);

      if (pouch) {
        const resourceIndex = pouch.resources.findIndex(
          (c) => c.id === resourceId
        );

        if (pouch.resources[resourceIndex].email === user.email) {
          pouch.resources.splice(resourceIndex, 1);
          await pouch.save();
          return pouch;
        } else {
          throw new AuthenticationError("Cannot delete resource");
        }
      } else {
        throw new UserInputError("Resource not found");
      }
    },
  },
};
