const express = require("express")

const connectionDB = require("./config/database")

const app = express();

const User = require("./models/user")

app.use(express.json());

app.post("/signup", async(req, res) => {
    //Creating a new instance of the user model
    const obj= req.body;
    const user = new User(obj)
   await user.save();
   res.send("User added successFully")
});


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
