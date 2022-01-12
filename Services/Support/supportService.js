const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const Support = require("../../Models/support");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/connectDB");

module.exports.createSupport = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { name, email, password } = req.body;

    let support = await Support.findOne({ where: { email } });

    if (!_.isEmpty(support)) {
      return res.status(400).send({
        message: "sorry support staff with the given email already exists",
      });
    }

    const support_id = uuidv4();

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    support = await Support.create({
      name,
      email,
      password,
      support_id,
    });

    return res
      .status(200)
      .send({ message: "Support Staff created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.getAllSupport = async (req, res, next) => {
  try {
    let support = await Support.findAll();
    if (_.isEmpty(support)) {
      return res.status(404).send("No support staff exist in the database");
    }
    return res.status(200).json(support);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
