const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")
const { validateSignUpData } = require("../utils/validation");
const validator = require("validator");



// signup users
authRouter.post("/signup", async (req, res) => {
    try {
        // validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encrypt password using bcrypt
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating intance of the new User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send("User added successfully!")
    } catch (err) {
        // Duplicate email error
        if (err.code === 11000) {  // 11000 is the error code for duplicate key error in MongoDB
            res.status(400).send("Error : Email already exists!");
        } else {
            res.status(400).send("Error : " + err.message);
        }
    }

})


authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid credentials!")
        }

        // find user using emailId
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Invalid credentials!!");
        }
        // encrypt password using bcrypt
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {

            //create a JWT token
            const token = await user.getJwt();
            // send cookie to user
            res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
            res.send("Login Successful!");
        } else {
            throw new Error("Invalid credentials!!!")
        }

    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

authRouter.post("/logout", (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })
        res.send("Logout successful!")
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})


module.exports = authRouter;