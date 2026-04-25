const express = require("express")
const profileRouter = express.Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")




profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const userObject = req.user
        res.send(userObject)
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit request");
        }

        const userObject = req.user
        Object.keys(req.body).forEach((key) => (userObject[key] = req.body[key]))
        await userObject.save()
        // res.send("profile updated successfuly")
        res.json({
            message: "profile updated successfuly",
            data: userObject
        })
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})




module.exports = profileRouter;