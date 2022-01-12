const { Sequelize, UUIDV4, BOOLEAN, STRING } = require("sequelize");
const { sequelize } = require("../config/connectDB");

const User = sequelize.define("User", {
  user_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = User;
