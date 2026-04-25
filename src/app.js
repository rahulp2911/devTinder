const express = require("express")
const connectionDB = require("./config/database")
const app = express();
const User = require("./models/user")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userAuth } = require("./middlewares/auth")


app.use(express.json());
app.use(cookieParser()) // add middleware also 

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);





// app.get("/user", async (req, res) => {
//     const userEmailId = req.body.emailId;
//     try {
//         // const user = await User.find({ emailId: userEmailId });
//         const user = await User.findOne({ emailId: userEmailId });
//         res.send(user);
//     } catch (err) {
//         res.status(400).send("something went wrong");
//     }
// });



connectionDB().then(() => {
    console.log("database connection esablish...");

    app.listen(7777, () => {
        console.log("server is listening on port 7777...");
    });

}).catch((err) => {
    console.error("database can not connected");
})
