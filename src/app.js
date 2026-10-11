const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Welcome!");
});

app.get("/hii", (req, res) => {
  res.send("Hii from the server!");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
