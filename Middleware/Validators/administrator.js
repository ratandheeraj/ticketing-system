const { check } = require("express-validator");

module.exports.createAdministratorValidator = [
  check("name", "name of the administrator is required").not().isEmpty(),
  check("email", "please provide a valid email id").isEmail(),
  check("password", "please provide a password with minimum of 6 characters")
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
];
