const express = require("express")
const profileRouter = express.Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userAuth } = require("../middlewares/auth")




profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const userObject = req.user
        res.send(userObject)
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})


module.exports = profileRouter;