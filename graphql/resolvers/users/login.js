const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dependency For Apollo to recognize errors and display it
const { UserInputError } = require("apollo-server");

// Bring in Validation of registering a user
const { validateLoginInput } = require("../../../utils/validators");
const { SECRET_KEY } = require("../../../config/config");

module.exports = {
  Mutation: {
    // login
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      // If user is not valid => throw error
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Get user from database
      const user = await User.findOne({ email });

      // If user does not exist => throw error
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      // Compare password in DB to inputted password on login
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        errors.general = "Email or Password is incorrect";
        throw new UserInputError("Email or Password is incorrect", {
          errors,
        });
      }

      // Return token in response on login
      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 360000 });

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
