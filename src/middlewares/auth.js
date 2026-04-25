
const jwt = require("jsonwebtoken")
const User = require("../models/user")


const userAuth = async(req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Invalid Token");
        }

        const decodedMessage = await jwt.verify(token, "RAHUL@123")
        const { _id } = decodedMessage;
        const userObject = await User.findById(_id);

        if (!userObject) {
            throw new Error("User does not exist");
        }
        req.user=userObject
        next();
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
}

module.exports = {
    userAuth,
}