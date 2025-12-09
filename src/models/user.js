const mongoose = require("mongoose");

//created userSchema from mongoose library
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
      match: /^[A-Za-z]+$/,
    },
    lastName: {
      type: String,
      match: /^[A-Za-z]+$/,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
      max: 20,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid!");
        }
      },
    },
    photoURL: {
      type: String,
    },
    about: {
      type: String,
      default: "This is default about section!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

//creating Model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
