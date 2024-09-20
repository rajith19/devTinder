const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

const ALLOWED_DATA = "firstName lastName photoUrl gender age skills about";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ALLOWED_DATA);

        if (!connectionRequest) {
            return res.status(400).json({
                message: `Connection requests not found!`,
                data: []
            })
        }
        res.json({
            message: `Data fetched successfully`,
            data: connectionRequest
        })

    } catch (err) {
        req.status(400).send(`Error : ${err.message}`)
    }
})


userRouter.get("/user/requests/connected", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", ALLOWED_DATA).populate("toUserId", ALLOWED_DATA);

        if (!connectionRequest) {
            return res.status(400).json({
                message: `Connection requests not found!`,
                data: []
            })
        }

        const data = connectionRequest.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })


        res.json({
            message: `Data fetched successfully`,
            data
        })


    } catch (err) {
        req.status(400).send(`Error : ${err.message}`)
    }
})


module.exports = userRouter;