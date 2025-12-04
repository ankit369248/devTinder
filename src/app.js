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

// get users API
app.get("/user", async (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);
  const userEmail = reqBody?.emailId || null;
  try {
    if (userEmail) {
      const users = await User.find({ emailId: userEmail });
      if (users.length > 0) {
        res.send(users);
      } else {
        res.status(404).send("User not found!");
      }
    } else {
      res.status(404).send("Invalid Input, Please give correct input!");
    }
  } catch (err) {
    console.log("Something went wrong :", err.message);
    res.send(404).send("Something went wrong :", err.message);
  }
});

// feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.send("No records found!");
    }
  } catch (err) {
    console.log("Something went wrong :", err.message);
    res.send(404).send("Something went wrong :", err.message);
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
