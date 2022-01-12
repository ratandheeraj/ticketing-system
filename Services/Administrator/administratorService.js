const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const Administrator = require("../../Models/administrator");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/connectDB");

module.exports.createAdministrator = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body.name);
    let { name, email, password } = req.body;

    let administrator = await Administrator.findOne({ where: { email } });

    if (!_.isEmpty(administrator)) {
      return res.status(400).send({
        message: "sorry administrator with the given email already exists",
      });
    }

    const administrator_id = uuidv4();

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    administrator = await Administrator.create({
      name,
      email,
      password,
      administrator_id,
    });

    return res
      .status(200)
      .send({ message: "Administrator created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
