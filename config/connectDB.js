const { Sequelize } = require("sequelize");
require("dotenv").config();

// const config = require("config");
// const user = config.get("dbUser");
// const password = config.get("dbPassword");
// const dbName_local = config.get("dbName_local");
user = process.env.dbUser;
password = process.env.dbPassword;
dbName_local = process.env.dbName_local;

const sequelize = new Sequelize(dbName_local, user, password, {
  dialect: "mysql",
  // host: process.env.dbHost_remote,
  // dialectOptions: {
  // ssl: {
  //     require: true,
  // },
  // },
});

const connectSQLDB = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.log("Unable to connect to the database:", err);
      });
    await sequelize.sync();
    console.log("Connected to MySQL");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { sequelize, connectSQLDB };
