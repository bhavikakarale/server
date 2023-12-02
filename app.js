require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const connectDB = require("./db");

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use("/", routes);

connectDB();

server.listen(process.env.PORT, () => {
  console.log("Server is running!");
});
