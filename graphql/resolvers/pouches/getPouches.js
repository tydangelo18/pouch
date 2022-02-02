const Pouch = require("../../../models/Pouch");

module.exports = {
  Query: {
    async getPouches() {
      try {
        const pouches = await Pouch.find().sort({ createdAt: -1 });
        return pouches;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
