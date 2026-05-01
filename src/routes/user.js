const express = require("express")
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")



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



userRouter.get("/feed", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        const skip = (page - 1) * limit;
        let limit = parseInt(req.query.limit)
        limit = limit > 50 ? 50 : limit


        //find all coneection requests ( send + received)
        const connectioRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],

        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set();

        connectioRequests.forEach(req => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select("firstName lastName photoUrl gender age skills about").skip(skip).limit(limit);

        res.send(users);
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

})


module.exports = userRouter;