// Import the express library to create an Express app
const express = require('express');
const connectDB = require("./config/database")
// Initialize the Express application
const app = express();
const User = require("./models/user");
const user = require('./models/user');

// it parses incoming HTTP request from the body
app.use(express.json());

// fetch all users using req. emailId
app.get("/user", async (req, res) => {

    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        if (users.length === 0) {
            res.status(404).send("User not found.");
        } else {
            res.send(users);
        }

    } catch (err) {
        res.status(400).send("Something went wrong :" + err.message);
    }

})

// Feed API - GET /feed all users from database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        if (user.length == 0) {
            res.status(400).send("Error getting users");
        } else {
            res.send(users);
        }

    } catch (err) {
        res.status(400).send("Something went wrong :" + err.message);
    }

})

// signup users
app.post("/signup", async (req, res) => {

    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully!")
    } catch (err) {
        // Duplicate email error
    if (err.code === 11000) {  // 11000 is the error code for duplicate key error in MongoDB
        res.status(400).send("Email already exists!");
      } else {
          res.status(400).send("Something went wrong :" + err.message);
      }
    }

})

//  delete user
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong : " + err.message);
    }
})

// update users
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId , data);
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("Something went wrong : " + err.message);
    }
})

// update users using emailId
app.patch("/userEmail", async (req, res) => {

    const emailId = req.body.emailId;
    const data = req.body;
    try {
        const user = await User.findOneAndUpdate({emailId : emailId}, {firstName : data.firstName});
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("Something went wrong : " + err.message);
    }
})

connectDB().then(() => {
    console.log("Database connection established...");
    // Start the server and listen on port 3000 for incoming connections
    app.listen(3000, () => {
        console.log("server started successfully on port 3000...");
    });
}).catch(err => {
    console.log("error in establising connection")
})


