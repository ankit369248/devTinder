require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { reqBodyValidation } = require("./utils/validation");

const { authMiddleware } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

// sign up
app.post("/signup", async (req, res) => {
  try {
    reqBodyValidation(req.body);

    const { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    const isPasswordValid = await user.validateUser(password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production (HTTPS)
      expires: new Date(Date.now() + 60000),
    });

    res.send("User logged in successfully");
  } catch (err) {
    res.status(500).send("Login failed");
  }
});

// send connection request
app.post("/sendConnectionRequest", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const firstName = user.firstName;
    res.send(`${firstName} send the connection request`);
    console.log(`${firstName} send the connection request`);
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

//profile
app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//feed (all users)
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(404).send("No records found");
    }
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// get (user by email)
app.get("/userOne/:emailId", async (req, res) => {
  try {
    const { emailId } = req.params;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// delete (user by email)
app.delete("/user", async (req, res) => {
  try {
    const { emailId } = req.body;

    if (!emailId) {
      return res.status(400).send("emailId is required");
    }

    const deletedUser = await User.findOneAndDelete({ emailId });
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//update (user by id)
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const reqBody = req.body;

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

    if (!isUpdateAllowed) {
      return res.status(400).send("Update not allowed");
    }

    if (reqBody.password) {
      reqBody.password = await bcrypt.hash(reqBody.password, 10);
    }

    if (reqBody.skills && reqBody.skills.length > 10) {
      return res.status(400).send("More than 10 skills not allowed");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, reqBody, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Update failed");
  }
});

// DB + Server
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
