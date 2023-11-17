const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://aachava2:Mongo10144@cluster0.obbojwn.mongodb.net/?retryWrites=true&w=majority";

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
