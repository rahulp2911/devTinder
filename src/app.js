const express = require("express")
const connectionDB = require("./config/database")
const app = express();
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


app.use(express.json());
app.use(cookieParser()) // add middleware also 



app.post("/signup", async (req, res) => {
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





app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const userData = await User.findOne({ emailId: emailId })

        if (!userData) {
            throw new Error("Invalid Credentials, User not found");
        }

        const isPassworsValid = await bcrypt.compare(password, userData.password);

        if (isPassworsValid) {
            //Create a JWT Token
            const token = await jwt.sign({ _id: userData._id }, "RAHUL@123") //hide some data in token --> _id: user._id , also add secreat key

            //add token to the cookie and send the response back to user
            res.cookie("token", token);
            res.send("Login Successful!!!")
        } else {
            throw new Error("Invalid Credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})





app.get("/profile", async (req, res) => {
    try {

        const cookies = req.cookies;
        const { token } = cookies

        if (!token) {
            throw new Error("Invalid Token");
        }

        const decodedMessage = await jwt.verify(token, "RAHUL@123")
        const { _id } = decodedMessage;

        const userObject = await User.findById(_id);

        if (!userObject) {
            throw new Error("User does not exist");
        }

        res.send(userObject)
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})



app.get("/user", async (req, res) => {
    const userEmailId = req.body.emailId;
    try {
        // const user = await User.find({ emailId: userEmailId });
        const user = await User.findOne({ emailId: userEmailId });
        res.send(user);
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});



connectionDB().then(() => {
    console.log("database connection esablish...");

    app.listen(7777, () => {
        console.log("server is listening on port 7777...");
    });

}).catch((err) => {
    console.error("database can not connected");
})
