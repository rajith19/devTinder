// Import the express library to create an Express app
const express = require('express');

// Initialize the Express application
const app = express();

app.get("/getUserData", (req, res) => {
    try {
        throw new error("simply an error");
        res.send("User data sent")
    } catch (err) {
        res.status(500).send("Something went wrong, Contact support");
    }
})

// error handling should added in the end but make sure try catch is used in every route handlers
app.use("/", (err, req, res, next) => {
    if (err) {
        //log your error
        res.status(500).send("Something went wrong")
    }

})

// Start the server and listen on port 3000 for incoming connections
app.listen(3000, () => {
    console.log("server started successfully on port 3000...");
});
