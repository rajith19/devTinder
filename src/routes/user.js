const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl gender age skills about";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);

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

userRouter.get("/user/requests/ignored", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "ignored"
        }).populate("fromUserId", USER_SAFE_DATA);

        if (!connectionRequest) {
            return res.status(400).json({
                message: `Connection requests not found!`,
                data: []
            })
        }
        const data = []; // Initialize an empty array

        connectionRequest.forEach(row => {
            data.push({
                _id: row._id,       // Add _id as a key
                fromUser: row.fromUserId // Add fromUser as a key
            });
        });

        res.json({
            message: `Data fetched successfully`,
            data
        })

    } catch (err) {
        res.status(400).send(`Error : ${err.message}`)
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
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

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

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        if (!connectionRequests) {
            res.status(400).json({
                message: `Connection not found`,
                data: []
            })
        }

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((e) => {
            hideUsersFromFeed.add(e.fromUserId.toString());
            hideUsersFromFeed.add(e.toUserId.toString())
        })

        const data = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.json({
            message: `Data fetched successfully`,
            data
        })

    } catch (err) {
        res.status(400).send(`Error : ${err.message}`)
    }


});


module.exports = userRouter;