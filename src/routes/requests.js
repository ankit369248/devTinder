const express = require("express");
const requestRouter = express.Router();
const { authMiddleware } = require("../middlewares/auth");

// send connection request
requestRouter.post("/send", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const firstName = user.firstName;
    res.send(`${firstName} send the connection request`);
    console.log(`${firstName} send the connection request`);
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = requestRouter;
