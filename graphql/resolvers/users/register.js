const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dependency For Apollo to recognize errors and display it
const { UserInputError } = require("apollo-server");

// Bring in Validation of registering a user
const { validateRegisterInput } = require("../../../utils/validators");
const { SECRET_KEY } = require("../../../config/config");

module.exports = {
  Mutation: {
    // register
    async register(_, { registerInput: { email, password, confirmPassword } }) {
      // Validate the user data for logging in
      const { valid, errors } = validateRegisterInput(
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
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

      const registeredUser = await newUser.save();

      // Create token
      const payload = {
        user: {
          id: registeredUser.id,
          email: registeredUser.email,
        },
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 360000 });

      return {
        ...registeredUser._doc,
        id: registeredUser._id,
        token,
      };
    },
  },
};
