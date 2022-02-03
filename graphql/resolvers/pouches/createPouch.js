const Pouch = require("../../../models/Pouch");
const authCheck = require("../../../utils/auth");

module.exports = {
  Mutation: {
    async createPouch(_, { name }, context) {
      if (name.trim() === "") {
        throw new Error("Pouch must have a name");
      }

      const user = authCheck(context);

      const newPouch = new Pouch({
        name,
        user: user.id,
        createdAt: new Date().toISOString(),
      });

      // Save the pouch
      const pouch = await newPouch.save();

      return pouch;
    },
  },
};
