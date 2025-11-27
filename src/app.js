const express = require("express");

const app = express();

const port = 7777;

const { adminAuth } = require("./middlewares/auth");

/*
app.use("/admin", adminAuth, (req, res, next) => {
  next();
});
*/
//Route Handlers
app.post(
  "/usr/login",
  (req, res, next) => {
    console.log("Into the 1st handler!!");
    next();
  },
  (req, res, next) => {
    console.log("Into the 2nd handler!!");
    next();
  },
  (req, res) => {
    console.log("I am third handler");
    res.send("Welcome to our family!");
  }
);

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("All Data is received!");
});

app.get("/admin/deleteAllData", adminAuth, (req, res) => {
  res.send("All Data is deleted!");
});

app.listen(port, () => {
  console.log(`Server is successfully listening on ${port}...`);
});
