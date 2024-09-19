const express = require("express")
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth")


requestsRouter.post("/sendingConnectionRequest", userAuth, async (req, res) => {
    const { firstName } = req.user;
    res.send(firstName + " Connection request sent!")
})


module.exports = requestsRouter;