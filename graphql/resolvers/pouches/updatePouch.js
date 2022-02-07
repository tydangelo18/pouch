const { AuthenticationError } = require("apollo-server");

const Pouch = require("../../../models/Pouch");
const authCheck = require("../../../utils/auth");

module.exports = {
  Mutation: {
    async updatePouch(_, { pouchId, name }, context) {
      const user = authCheck(context);

      // Make sure user is creator of Pouch to update
      try {
        const pouch = await Pouch.findById(pouchId);

        if (user.id === pouch.user.toString()) {
          await pouch.updateOne({
            pouchId: pouchId,
            name: name,
          });
          return "Pouch updated";
        } else {
          throw new AuthenticationError("Cannot update Pouch");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
