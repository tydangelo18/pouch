const Pouch = require("../../../../models/Pouch");
const authCheck = require("../../../../utils/auth");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    createResource: async (_, { pouchId, link }, context) => {
      const user = authCheck(context);

      if (link.trim() === "") {
        throw new UserInputError("Empty Resource", {
          errors: {
            link: "Resource field cannot be empty",
          },
        });
      }

      const pouch = await Pouch.findById(pouchId);

      if (pouch) {
        pouch.resources.unshift({
          link,
          createdAt: new Date().toISOString(),
        });

        await pouch.save();
        return pouch;
      } else throw new UserInputError("Pouch not found");
    },
  },
};
