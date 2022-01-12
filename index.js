const express = require("express");
const cors = require("cors");

const app = express();

const { connectSQLDB } = require("./config/connectDB");

connectSQLDB();
app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api", require("./Routes/Api/index"));

const port = process.env.port;
app.listen(port, () => console.log("Express server is running"));
