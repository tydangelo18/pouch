const jwt = require("jsonwebtoken");
// To verify the token
const { SECRET_KEY } = require("../config/config");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  // context = { ...headers: authorization header }
  // Get auth header
  const authHeader = context.req.headers.authorization;

  // Check for auth header
  if (authHeader) {
    // Get token from auth header
    // Bearer ... [token]
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      // Verify the token and make sure it's still valid
      try {
        const validToken = jwt.verify(token, SECRET_KEY);
        return validToken;
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    }
    throw new Error("Authentication token must be ===> 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
