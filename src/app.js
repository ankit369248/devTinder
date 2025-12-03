require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // to parse JSON body

app.post("/signup", async (req, res) => {
  //creating new instanceof user model
  const reqBody = req.body;
  console.log(reqBody);
  const user = new User(reqBody);
  try {
    await user.save();
    res.send("User Added successfully!");
    console.log("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
    console.log("Error saving the user: ", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port " + process.env.PORT);
    });
  })
  .catch(() => {
    console.log("Database connection failed!");
  });
