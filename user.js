const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, // This ensures that the email is unique in the collection
    required: true, // This makes the email field required
    trim: true, // Trims whitespace from the email
    lowercase: true, // Converts the email to lowercase
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: String,
  about: String,
  experiences: Array,
  projects: Array,
  current_company: String,
  current_position: String,
  firstName: String,
  lastName: String,
  github: String,
  instagram: String,
  twitter: String,
  linkedin: String,
  tagLine: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
