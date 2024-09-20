const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        // read the cookied from the req
        const cookies = req.cookies;
        // validate the token
        const { token } = cookies;
        if (!token) {
            throw new Error("Invalid token!!")
        }
        const decodeObj = await jwt.verify(token, process.env.JWT_SECRET)
        const { _id } = decodeObj;

        // find the user by id
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User does not exits");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }

}

module.exports = {
    userAuth
}