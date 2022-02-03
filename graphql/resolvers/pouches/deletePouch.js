const { AuthenticationError } = require("apollo-server");

const Pouch = require("../../../models/Pouch");
const authCheck = require("../../../utils/auth");

module.exports = {
  Mutation: {
    async deletePouch(_, { pouchId }, context) {
      const user = authCheck(context);

      // Make sure user is creator of Pouch to delete
      try {
        const pouch = await Pouch.findById(pouchId);

        if (user.id === pouch.user.toString()) {
          await pouch.delete();
          return "Pouch deleted";
        } else {
          throw new AuthenticationError("Cannot delete Pouch");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
