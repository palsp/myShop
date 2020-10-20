const { check, body } = require("express-validator/check");
const User = require("../models/user");

module.exports = [
  check("email", "E-mail is invalid")
    .isEmail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (!user) {
          return Promise.reject("E-mail does not existed. Please Signup");
        }
      });
    })
    .normalizeEmail(),
  body("password", "password is wrong")
    .trim()
    .isLength({ min: 5 })
    .isAlphanumeric(),
];
