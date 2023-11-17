const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  about: String,
  experiences: Array,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
