// Import the express library to create an Express app
const express = require('express');
const connectDB = require("./config/database")
// Initialize the Express application
const app = express();
const User = require("./models/user")

app.post("/signup", async (req, res) => {

    console.log(req);
    //creating a new instance of User model
    const user = new User({
        firstName: "Megha",
        lastName: "KB",
        emailId: "megha@gmail.com",
        password: "123456"
    });
    try {
        await user.save();
        res.send("User added successfully")

    } catch (err) {
        res.status(400).send("Error saving user : " + err.message);
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


