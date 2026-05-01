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




// Get all the pending connection request fro the logged in user 
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connectioRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "gender", "age", "skills", "about"])
            .populate("toUserId", ["firstName", "lastName", "photoUrl", "gender", "age", "skills", "about"]);

        const filterData = connectioRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId
        });

        res.json({ message: "Connection Request fetch successfully", data: filterData })

    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

})



module.exports = userRouter;