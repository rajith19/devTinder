// Import the express library to create an Express app
const express = require('express');

// Initialize the Express application
const app = express();

// This will only respond to GET requests made to "/user"
app.get("/user/:userId?", (req, res) => {
    console.log(req.params);
    res.send({firstName : "Rajith", lastname : "Gopal"});
});

// Start the server and listen on port 3000 for incoming connections
app.listen(3000, () => {
    console.log("server started successfully on port 3000...");
});
