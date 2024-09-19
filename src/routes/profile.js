const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")


profileRouter.get("/view", userAuth, async (req, res) => {
    try {
        res.send([req.user]);
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

profileRouter.patch("/edit", userAuth, async (req, res) => {
    try {
        console.log("started")
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Requests!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);

        loggedInUser.save();
        res.send({
            message: `${loggedInUser.firstName}, your profile was updated successfully`,
            data: loggedInUser
        })

    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = profileRouter;