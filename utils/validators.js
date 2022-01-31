module.exports.validateRegisterInput = (email, password, confirmPassword) => {
  const errors = {};
  if (email.trim() === " ") {
    errors.email = "Email field cannot be left blank";
  } else {
    const emailFormat =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailFormat)) {
      errors.email = "Must enter a valid email address";
    }
  }

  // PASSWORD REQUIREMENTS
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const spChar = /[!@#$%^&*]+/;
  const numChar = /[0123456789]/;

  // Password field cannot be empty
  if (password === " ") {
    errors.password = "You must create a password";

    // Password must contain at least 1 Uppercase character
  } else if (!upperCase.test(password) >= 1) {
    errors.password = "Password must contain at least 1 Uppercase letter";

    // Password must contain at least 1 lowercase character
  } else if (!lowerCase.test(password) >= 1) {
    errors.password = "Password must contain at least 1 lowercase letter";

    // Password must contain at least 1 special character
  } else if (!spChar.test(password) >= 1) {
    errors.password = "Password must contain at least 1 special character";

    // Password must contain at least 1 number
  } else if (!numChar.test(password) >= 1) {
    errors.password = "Password must contain at least 1 number";

    // Password and Confirm Password Field must match
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
