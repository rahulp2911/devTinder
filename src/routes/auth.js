const express = require("express")
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")




authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req)

        const { firstName, lastName, emailId, password } = req.body;

        //Encrypt the Password
        const passwordHash = await bcrypt.hash(password, 10);

        //Creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save();
        res.send("User added successFully")
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
});





authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const userData = await User.findOne({ emailId: emailId })

        if (!userData) {
            throw new Error("Invalid Credentials, User not found");
        }

        const isPassworsValid = await bcrypt.compare(password, userData.password);

        if (isPassworsValid) {
            //Create a JWT Token
            const token = await jwt.sign({ _id: userData._id }, "RAHUL@123", { expiresIn: "1d" }) //hide some data in token --> _id: user._id , also add secreat key

            //add token to the cookie and send the response back to user
            res.cookie("token", token, { exp: new Date(Date.now()) + 8 * 3600000 });
            res.send("Login Successful!!!")
        } else {
            throw new Error("Invalid Credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})



authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfuly");
});

module.exports = authRouter;