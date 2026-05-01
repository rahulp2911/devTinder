const express = require("express")
const requestRouter = express.Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowStatus = ["ignored", "interested"]
        if (!allowStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid Status Code type:" + status })
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ message: "User not found" })
        }


        const existingConnectioRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (existingConnectioRequest) {
            return res.status(400).json({ message: "Connection REquest Already Exist" })
        }

        const connectionRequest = new ConnectionRequest({ fromUserId, toUserId, status })
        const data = await connectionRequest.save();
        res.json({
            message: "Connection Request Send Successfuly !",
            data
        })

    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})
module.exports = requestRouter