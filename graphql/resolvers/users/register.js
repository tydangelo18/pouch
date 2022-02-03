const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dependency For Apollo to recognize errors and display it
const { UserInputError } = require("apollo-server");

// Bring in Validation of registering a user
const { validateRegisterInput } = require("../../../utils/validators");
const { SECRET_KEY } = require("../../../config/config");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

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

      const res = await newUser.save();

      // Create token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
