const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true },
  blogs: { type: Array },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
