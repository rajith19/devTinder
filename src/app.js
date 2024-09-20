// Import the express library to create an Express app
const express = require('express');
const connectDB = require("./config/database")
// Initialize the Express application
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();

// it parses incoming HTTP request from the body
app.use(express.json());
// it parses all cookies
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("Database connection established...");
    // Start the server and listen on port 3000 for incoming connections
    app.listen(process.env.PORT, () => {
        console.log(`server started successfully on port ${process.env.PORT}...`);
    });
}).catch(err => {
    console.log("error in establising connection")
})


