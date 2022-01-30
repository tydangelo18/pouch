const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/config");

module.exports = {
  Mutation: {
    async register(_, { registerInput: { email, password } }) {
      // TODO: Validate the user data for logging in
      // TODO: Make sure user doesn't already exist so no duplicate users can be stored into the database (same email)

      // Hash password before storing to DB
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      // Create Auth Token
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
