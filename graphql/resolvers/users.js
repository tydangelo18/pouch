const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Dependency For Apollo to recognize errors and display it
const { UserInputError } = require("apollo-server");
const { SECRET_KEY } = require("../../config/config");

module.exports = {
  Mutation: {
    async register(_, { registerInput: { email, password } }) {
      // TODO: Validate the user data for logging in

      // Make sure user doesn't already exist so no duplicate users can be stored into the database (same email)
      const user = await User.findOne({ email });
      // if user already exists => return an error
      if (user) {
        throw new UserInputError(
          // error will be dislayed on front end if condition is met
          "This email is already being used by another account, please use another email",
          {
            errors: {
              email:
                "This email is already being used by another account, please use another email",
            },
          }
        );
      }
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
