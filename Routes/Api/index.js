const express = require("express");
const router = express.Router();

//Imports for Administrator
const AdministratorService = require("../../Services/Administrator/administratorService");
const {
  createAdministratorValidator,
} = require("../../Middleware/Validators/administrator");

//Imports for Ticket
const TicketService = require("../../Services/Ticket/ticketService");
const { createTicketValidator } = require("../../Middleware/Validators/ticket");

//Imports for Support
const SupportService = require("../../Services/Support/supportService");
const {
  createSupportValidator,
} = require("../../Middleware/Validators/support");

//Imports for Ticket
const UserService = require("../../Services/User/userService");
const { createUserValidator } = require("../../Middleware/Validators/user");

router.post(
  "/administrator",
  createAdministratorValidator,
  (req, res, next) => {
    return AdministratorService.createAdministrator(req, res, next);
  }
);

router.post("/ticket", createTicketValidator, (req, res, next) => {
  return TicketService.createTicket(req, res, next);
});

router.post("/user", createUserValidator, (req, res, next) => {
  return UserService.createUser(req, res, next);
});

router.post("/support", createSupportValidator, (req, res, next) => {
  return SupportService.createSupport(req, res, next);
});

module.exports = router;
