const express = require("express")
const requestRouter = express.Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userAuth } = require("../middlewares/auth")



requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("Sending a coneection request")
    res.send(user.firstName + "Send the coneection request!")
})
module.exports = requestRouter