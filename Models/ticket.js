const { Sequelize, UUIDV4, STRING, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");

const Ticket = sequelize.define("Ticket", {
  ticket_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  ticketName: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  createdUser: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  assignee: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      "open",
      "closed",
      "under-review",
      "resolved",
      "re-open"
    ),
    allowNull: false,
  },
});

module.exports = Ticket;
