const { model, Schema } = require("mongoose");

const pouchSchema = new Schema({
  name: String,
  createdAt: String,
  resources: [
    {
      link: String,
      createdAt: String,
    },
  ],
  // Link Pouch model to User Model
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Pouch", pouchSchema);
