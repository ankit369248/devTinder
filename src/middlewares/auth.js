const adminAuth = (req, res, next) => {
  const token = "12345";
  console.log("Admin auth is authenticated!");
  if (!token) {
    console.log("Admin is not authentic so details are not authorized!");
    res.status(401).send("You are not authorized for admin access!!");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
