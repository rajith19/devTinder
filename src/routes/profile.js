const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")
const validatePassword = require("../models/user");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        res.send([req.user]);
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Requests!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);

        await loggedInUser.save();
        res.send({
            message: `${loggedInUser.firstName}, your profile was updated successfully`,
            data: loggedInUser
        })

    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})


profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).send("New password and confirm password do not match.");
        }
        const user = req.user;
        const validateCurrentPassword = await user.validatePassword(currentPassword);
        if (!validateCurrentPassword) {
            throw new Error("Invalid current password!");
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.send("Password Updated successfully!");

    } catch (err) {
        res.status(400).send(`Error : ${err.message}`)
    }
})

module.exports = profileRouter;