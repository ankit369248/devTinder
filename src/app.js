const express = require("express");

const app = express();

const port = 7777;

//Request handler
app.get("/", (req, res) => {
  res.send("Hello ji!!");
});

app.get("/get", (req, res) => {
  res.send("Hiiii!!");
});

app.get("/getWishes", (req, res) => {
  res.send("Hello Hope you are doing well!!");
});

app.listen(port, () => {
  console.log(`Server is successfully listening on ${port}...`);
});
