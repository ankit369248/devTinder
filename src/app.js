const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("User data received successfully!");
});

app.post("/user", (req, res) => {
  res.send("User data inserted successfully!");
});

app.put("/user", (req, res) => {
  res.send("User data updated successfully!");
});

app.delete("/user", (req, res) => {
  res.send("User data deleted successfully!");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
