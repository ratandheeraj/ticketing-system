const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const Ticket = require("../../Models/ticket");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/connectDB");

module.exports.createTicket = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { ticketName, description, createdUser, status } = req.body;

    const assignee = null;
    const ticket_id = uuidv4();

    const ticket = await Ticket.create({
      ticketName,
      description,
      createdUser,
      assignee,
      status,
      ticket_id,
    });

    return res.status(200).send({ message: "Ticket created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.getAllTickets = async (req, res, next) => {
  try {
    let tickets = await Ticket.findAll();
    if (_.isEmpty(tickets)) {
      return res.status(404).send("No tickets exist in the database");
    }
    return res.status(200).json(tickets);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.getTicketById = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    console.log(req.params);
    let ticket = await Ticket.findAll({
      where: { ticket_id },
    });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No Ticket exist in the database with given Ticket Id");
    }
    return res.status(200).json(ticket);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.getTicketByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(req.params);
    let ticket = await Ticket.findAll({
      where: { createdUser: user_id },
    });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No Ticket exist in the database with given User Id");
    }
    return res.status(200).json(ticket);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.getTicketBySupportId = async (req, res, next) => {
  try {
    const { support_id } = req.params;
    console.log(req.params);
    let ticket = await Ticket.findAll({
      where: { assignee: support_id },
    });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No Ticket exist in the database with given Support staff Id");
    }
    return res.status(200).json(ticket);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.resolveTicket = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    let ticket = await Ticket.findOne({ where: { ticket_id } });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No ticket exist in the database with given ticket Id");
    }
    ticket.status = "resolved";
    let updatedTicket = await ticket.save();

    return res.status(200).json(updatedTicket);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
module.exports.closeTicket = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    let ticket = await Ticket.findOne({ where: { ticket_id } });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No ticket exist in the database with given ticket Id");
    }
    ticket.status = "closed";
    let updatedTicket = await ticket.save();

    return res.status(200).json(updatedTicket);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
module.exports.reopenTicket = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    let ticket = await Ticket.findOne({ where: { ticket_id } });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No ticket exist in the database with given ticket Id");
    }
    ticket.status = "re-open";
    let updatedTicket = await ticket.save();

    return res.status(200).json(updatedTicket);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
module.exports.underReivewTicket = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    let ticket = await Ticket.findOne({ where: { ticket_id } });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No ticket exist in the database with given ticket Id");
    }
    ticket.status = "under-review";
    let updatedTicket = await ticket.save();

    return res.status(200).json(updatedTicket);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
module.exports.assignTicket = async (req, res, next) => {
  try {
    const { ticket_id, support_id } = req.query;
    let ticket = await Ticket.findOne({ where: { ticket_id } });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No ticket exist in the database with given ticket Id");
    }
    ticket.assignee = support_id;
    let updatedTicket = await ticket.save();

    return res.status(200).json(updatedTicket);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.deleteTicketById = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    let ticket = await Ticket.findAll({
      where: { ticket_id },
    });
    if (_.isEmpty(ticket)) {
      return res
        .status(404)
        .send("No Ticket exist in the database with given Ticket Id");
    }
    await Ticket.destroy({
      where: { ticket_id },
    });
    return res.status(200).send("deleted successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
