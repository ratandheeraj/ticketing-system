const { check } = require("express-validator");

module.exports.createTicketValidator = [
  check("ticketName", "name of the ticket is required").not().isEmpty(),
  check("description", "description of the ticket is required").not().isEmpty(),
  check("createdUser", "createdUser is required").matches(
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  ),
  check("status", "Status is undefined")
    .not()
    .isEmpty()
    .matches(/\b(?:open|closed|resolved|re-open|under-review)\b/),
];
