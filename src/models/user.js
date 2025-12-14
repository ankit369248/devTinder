const mongoose = require("mongoose");
const validator = require("validator");

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
      minLength: 3,
      maxLength: 25,
      match: /^[A-Za-z]+$/,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("EmailId Format is Invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
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
      maxLength: 255,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("URL is not valid!");
        }
      },
    },
    about: {
      type: String,
      maxLength: 255,
      default: "This is default about section!",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Skills cannot be more than 10");
        }
      },
    },
  },
  { timestamps: true }
);

//creating Model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
