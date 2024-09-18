// Import the express library to create an Express app
const express = require('express');

// Initialize the Express application
const app = express();



const adminAuth = app.use("/admin", (req, res) => {
    console.log("Authorizing admin...");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request")
    } else {
        next();
    }

})

const userAuth = app.use("/user", (req, res) => {
    console.log("Authorizing user...");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request")
    } else {
        next();
    }

})


module.exports = {
    adminAuth,
    userAuth
}