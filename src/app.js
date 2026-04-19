const express = require("express")

const connectionDB = require("./config/database")

const app = express();

const User = require("./models/user")


app.post("/signup", async(req, res) => {
    //Creating a new instance of the user model

    const obj = {
        firstName: "Rahul",
        lastName: "Patil",
        emailId: "rahul@g.com",
        password: "A123@"
    }
    const user = new User(obj)

   await user.save();
   res.send("User added successFully")

});









connectionDB().then(() => {
    console.log("database connection esablish...");

    app.listen(7777, () => {
        console.log("server is listening on port 7777...");
    });

}).catch((err) => {
    console.error("database can not connected");
})
