const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");
const { authMiddleware } = require("../middlewares/auth");

//profile
profileRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//profile edit
profileRouter.patch("/edit", authMiddleware, async (req, res) => {
  try {
    // Validate fields sent by client
    const isEditAllowed = validateEditProfileData(req.body);
    if (!isEditAllowed) {
      return res.status(400).send("Invalid update field request");
    }

    const loggedInUser = req.user; // Mongoose document

    // Apply updates
    Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });

    // Save updated user
    await loggedInUser.save();

    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// password edit
profileRouter.patch("/password", authMiddleware, async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return res.status(400).send("Old and new passwords are required");
    }

    const loggedInUser = req.user;

    // Verify old password
    const isOldPasswordValid = await loggedInUser.validateUser(password);
    if (!isOldPasswordValid) {
      return res.status(401).send("Old password is incorrect");
    }

    // Prevent same password reuse
    const isSamePassword = await bcrypt.compare(
      newPassword,
      loggedInUser.password
    );
    if (isSamePassword) {
      return res
        .status(400)
        .send("New password cannot be same as old password");
    }

    // Hash & save new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedPassword;

    await loggedInUser.save();

    res.send("Password updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = profileRouter;
