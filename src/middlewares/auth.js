const jwt = require("jsonwebtoken");
const User = require("../models/user");
/* ===========================
   AUTH MIDDLEWARE
=========================== */
const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found!");
    }
    req.userId = user._id;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = {
  authMiddleware,
};
