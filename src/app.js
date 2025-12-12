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
    res.status(404).send("Something went wrong :", err.message);
  }
});

// feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      return res.send(users);
    } else {
      return res.status(404).send("No records found!");
    }
  } catch (err) {
    console.log("Something went wrong :", err.message);
    return res.status(404).send("Something went wrong :" + err.message);
  }
});

// Get specific user data
app.get("/userOne/:emailId", async (req, res) => {
  try {
    console.log(req?.params.emailId);
    const emailId = req?.params.emailId;
    if (!emailId) {
      console.log("Invalid Input!");
      return res.status(400).send("Invalid Input!");
    }
    const user = await User.findOne({ emailId });
    if (!user) {
      console.log("User Not found!");
      return res.status(404).send("User Not found!");
    } else {
      console.log(user);
      return res.send(user);
    }
  } catch (err) {
    console.log("Something went wrong :", err.message);
    res.status(500).send("Something went wrong!");
  }
});

// API to delete a user
app.delete("/user", async (req, res) => {
  try {
    if (!req?.body?.emailId) {
      return res.status(400).send("Please provide required input emailId");
    }
    const { emailId } = req?.body;
    console.log(emailId);
    const deletedUser = await User.findOneAndDelete({ emailId });
    if (!deletedUser) {
      console.log(`User not found!`);
      return res.status(404).send("User not found!");
    }
    console.log(`User with ${emailId} is deleted successfully!`);
    res.send("User deleted successfully!");
  } catch (err) {
    console.log("Something went wrong :", err.message);
    res.status(500).send("Something went wrong!");
  }
});

// API to update the user data with any unique entity
/*
app.patch("/user", async (req, res) => {
  try {
    console.log(req?.body);
    if (!req.body.emailId) {
      return res.status(400).send("Please provide required input emailId");
    }

    const emailId = req.body.emailId;

    const updatedUser = await User.findOneAndUpdate({ emailId }, req.body, {
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send("User not found!");
    }

    return res.send("User updated successfully!");
  } catch (err) {
    console.log("Error:", err.message);
    return res
      .status(500)
      .send("Not able to Update user details: " + err.message);
  }
});
*/

// API to update user data with id
app.patch("/user/:userId", async (req, res) => {
  try {
    const reqBody = req?.body;
    console.log(`reqBody : ${reqBody}`);
    const UPDATE_ALLOWED = [
      "firstName",
      "lastName",
      "password",
      "skills",
      "photoURL",
      "about",
      "age",
    ];
    const isUpdateAllowed = Object.keys(reqBody).every((key) =>
      UPDATE_ALLOWED.includes(key)
    );
    console.log(`Is_UPDATE_ALLOWED : ${isUpdateAllowed}`);

    const userId = req?.params.userId;
    console.log(userId);
    if (!userId) {
      return res.status(404).send("Please provide required userId inputs!");
    }
    if (!isUpdateAllowed) {
      throw new Error("Update Not allowed");
    }
    if (reqBody?.skills) {
      if (reqBody?.skills.length > 10)
        throw new Error("More than 10 skills input is not allowed");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, reqBody, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).send("User not found!");
    }
    res.send("User updated successfully!");
  } catch (err) {
    console.log("Error:", err.message);
    return res.status(500).send("UPDATE FAILED : " + err.message);
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
