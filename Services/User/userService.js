const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const User = require("../../Models/user");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/connectDB");

module.exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!_.isEmpty(user)) {
      return res.status(400).send({
        message: "sorry user with the given email already exists",
      });
    }

    const user_id = uuidv4();

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password,
      user_id,
    });

    return res.status(200).send({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
