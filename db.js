require("dotenv").config();
const mongoose = require("mongoose");

const connectionString =
  process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString).then(() => {
      console.log("Connected to DB!!");
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

module.exports = connectDB;
