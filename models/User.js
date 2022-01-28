// User Model
const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdAt: Date,
});

module.exports = model("User", userSchema);
