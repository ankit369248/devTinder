const express = require("express");

const app = express();

const port = 7777;

//Request handler
app.get("/user/:userId", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send("Hello ji!!");
});

app.get("/get", (req, res) => {
  res.send("Hiiii!!");
});

app.get("/getWishes", (req, res) => {
  res.send("Hello Hope you are doing well!!");
});

app.post("/userdata", (req, res) => {
  console.log(req.body);
  res.send("Data saved to db successfully!");
});

app.delete("/delete", (req, res) => {
  res.send("Data deleted successfully!");
});

app.put("/put", (req, res) => {
  res.send("Data Updated successfully!");
});

app.patch("/patch", (req, res) => {
  res.send("Partial Data updated successfully!");
});
app.listen(port, () => {
  console.log(`Server is successfully listening on ${port}...`);
});
