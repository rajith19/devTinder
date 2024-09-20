const express = require("express")
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


requestsRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        console.log("inside")
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: `Invalid status type : ${status}` })
        }

        //  if request already exists
        const existsingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if (existsingConnectionRequest) {
            return res.status(400).json({ message: `Connection already exists` });
        }

        // check if toUserId exists
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ message: `User not found` });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();
        res.json({
            message: `Connection sent sucessfully!`,
            data
        });


    } catch (err) {
        res.status(400).send(`Error : ${err.message}`);
    }
})


module.exports = requestsRouter;