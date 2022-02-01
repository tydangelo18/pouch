const Pouch = require("../../../models/Pouch");

module.exports = {
  Query: {
    async getPouch(_, { pouchId }) {
      try {
        const pouch = await Pouch.findById(pouchId);
        return pouch;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
