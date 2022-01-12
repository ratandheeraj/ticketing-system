const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Administrator = require("../../Models/administrator");
const Support = require("../../Models/support");
const User = require("../../Models/user");
const { sequelize } = require("../../config/connectDB");
require("dotenv").config();

module.exports.administratorLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let administrator = await Administrator.findOne({ where: { email } });

    if (_.isEmpty(administrator)) {
      return res.status(400).json({ message: "Administrator does not exist" });
    }

    const validPassword = await bcrypt.compare(
      password,
      administrator.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const payload = {
      administrator_id: administrator.distributor_id,
      name: administrator.name,
      email: administrator.email,
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.supportLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let support = await Support.findOne({ where: { email } });

    if (_.isEmpty(support)) {
      return res.status(400).json({ message: "Support user does not exist" });
    }

    const validPassword = await bcrypt.compare(password, support.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      support_id: support.support_id,
      name: support.name,
      email: support.email,
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
module.exports.userLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ where: { email } });

    if (_.isEmpty(user)) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.login = async (req, res, next) => {
  try {
    let { email, password, type } = req.body;

    console.log(type);

    if (_.trim(type) === "administrator") {
      let administrator = await Administrator.findOne({
        where: { email },
      });

      if (_.isEmpty(administrator)) {
        return res
          .status(400)
          .json({ message: "Administrator does not exist" });
      }

      const validPassword = await bcrypt.compare(
        password,
        administrator.password
      );

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const modifiedUser = {
        administrator_id: retailer.administrator_id,
        name: retailer.name,
        email: retailer.email,
      };

      const payload = {
        administrator_id: retailer.administrator_id,
        name: retailer.name,
        email: retailer.email,
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "3h" },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, user: modifiedUser });
        }
      );

      //   console.log("ran");
    } else if (_.trim(type) === "support") {
      let { email, password } = req.body;

      let support = await Support.findOne({
        where: { email },
      });

      if (_.isEmpty(support)) {
        return res.status(400).json({ message: "Support user does not exist" });
      }

      const validPassword = await bcrypt.compare(password, support.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      const modifiedUser = {
        support_id: retailer.support_id,
        name: retailer.name,
        email: retailer.email,
      };

      const payload = {
        support_id: retailer.support_id,
        name: retailer.name,
        email: retailer.email,
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "3h" },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, user: modifiedUser });
        }
      );

      //   console.log("ran-2");
    } else if (_.trim(type) === "user") {
      let { email, password } = req.body;

      let user = await User.findOne({
        where: { email },
      });

      if (_.isEmpty(user)) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      const modifiedUser = {
        user_id: retailer.user_id,
        name: retailer.name,
        email: retailer.email,
      };

      const payload = {
        user_id: retailer.user_id,
        name: retailer.name,
        email: retailer.email,
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "3h" },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, user: modifiedUser });
        }
      );

      //   console.log("ran-2");
    } else {
      return res.status(400).send("please give a proper type");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.loadUser = async (req, res, next) => {
  try {
    const { type, token } = req.query;
    const jwtSecret = process.env.jwtSecret;

    jwt.verify(
      token,
      jwtSecret,
      { algorithms: ["HS256"] },
      (err, decodedToken) => {
        if (err) {
          return res.status(401).send({
            message: "The token that is provided is invalid or expired",
          });
        }
        return res
          .status(200)
          .send({ payload: decodedToken, message: "token verified" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.verifyToken = (req, res, next) => {
  try {
    const { token } = req.query;
    const jwtSecret = process.env.jwtSecret;
    jwt.verify(
      token,
      jwtSecret,
      { algorithms: ["HS256"] },
      (err, decodedToken) => {
        if (err) {
          return res.status(401).send({
            message: "The token that is provided is invalid or expired",
          });
        }
        return res
          .status(200)
          .send({ payload: decodedToken, message: "token verified" });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: "server error" });
  }
};
