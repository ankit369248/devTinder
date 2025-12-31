const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();
const { authMiddleware } = require("../middlewares/auth");

//feed (all users)
userRouter.get("/feed", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(404).send("No records found");
    }
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// get (user by email)
userRouter.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.send(user);
});

module.exports = userRouter;
