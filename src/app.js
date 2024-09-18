// Import the express library to create an Express app
const express = require('express');

// Initialize the Express application
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth")

app.use("/admin", adminAuth)

app.use("/admin/getAllData", (req, res) => {
    res.send("All data sent");
})

app.use("/admin/deletAllData", (req, res) => {
    res.send("Deleted a admin")
})

app.get("/user/login", (req, res) => {
    res.send("Login User")
})

app.use("/user", userAuth, (req, res) => {
    res.send("User requested")
})

// Start the server and listen on port 3000 for incoming connections
app.listen(3000, () => {
    console.log("server started successfully on port 3000...");
});
