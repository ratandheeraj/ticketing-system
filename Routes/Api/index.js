const express = require("express");
const router = express.Router();
const AuthService = require("../../Services/Auth/authService");
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

//All routes related to tickets

router.post("/ticket", createTicketValidator, (req, res, next) => {
  return TicketService.createTicket(req, res, next);
});
router.get("/tickets", (req, res, next) => {
  return TicketService.getAllTickets(req, res, next);
});
router.get("/ticket/:ticket_id", (req, res, next) => {
  return TicketService.getTicketById(req, res, next);
});
router.get("/ticket/user/:user_id", (req, res, next) => {
  return TicketService.getTicketByUserId(req, res, next);
});
router.get("/ticket/support/:support_id", (req, res, next) => {
  return TicketService.getTicketBySupportId(req, res, next);
});
router.get("/ticket/resolve/:ticket_id", (req, res, next) => {
  return TicketService.resolveTicket(req, res, next);
});
router.get("/ticket/close/:ticket_id", (req, res, next) => {
  return TicketService.closeTicket(req, res, next);
});
router.get("/ticket/review/:ticket_id", (req, res, next) => {
  return TicketService.underReivewTicket(req, res, next);
});
router.get("/ticket/reopen/:ticket_id", (req, res, next) => {
  return TicketService.reopenTicket(req, res, next);
});
router.patch("/ticket", createUserValidator, (req, res, next) => {
  return TicketService.assignTicket(req, res, next);
});
router.delete("/ticket/:ticket_id", createUserValidator, (req, res, next) => {
  return TicketService.deleteTicketById(req, res, next);
});

//All routes related to authentication
router.post("/administrator/auth", (req, res, next) => {
  return AuthService.administratorLogin(req, res, next);
});
router.post("/support/auth", (req, res, next) => {
  return AuthService.supportLogin(req, res, next);
});
router.post("/user/auth", (req, res, next) => {
  return AuthService.userLogin(req, res, next);
});
router.get("/auth/verify", (req, res, next) => {
  return AuthService.verifyToken(req, res, next);
});
router.post("/auth", (req, res, next) => {
  return AuthService.login(req, res, next);
});

//All routes related to user
router.post("/user", createUserValidator, (req, res, next) => {
  return UserService.createUser(req, res, next);
});

//All routes related to tickets

router.post("/support", createSupportValidator, (req, res, next) => {
  return SupportService.createSupport(req, res, next);
});

router.get("/support", createSupportValidator, (req, res, next) => {
  return SupportService.getAllSupport(req, res, next);
});

module.exports = router;
