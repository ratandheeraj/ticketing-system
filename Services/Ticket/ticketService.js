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

    // let ticket = await Ticket.findOne({ where: { email } });

    // if (!_.isEmpty(administrator)) {
    //   return res.status(400).send({
    //     message: "sorry administrator with the given email already exists",
    //   });
    // }
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
