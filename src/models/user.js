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
      maxLength: 25,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 20,
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
