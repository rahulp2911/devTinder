const express = require("express")
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");



// Get all the pending connection request fro the logged in user 
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const existingConnectioRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "gender", "age", "skills", "about"]);

        res.json({ message: "Data fetch successfully", data: existingConnectioRequest })

    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

})



module.exports = userRouter;