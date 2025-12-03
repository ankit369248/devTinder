const mongoose = require("mongoose");

//created userSchema from mongoose library
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

//creating Model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
