const express = require("express")
const app = express();


const { adminAuth, userAuth } = require("./middlewares/auth");


app.use("/admin", adminAuth);


app.post("/user/login", (req, res) => {
    res.send("Users lOgin Succssfully login");
});

app.get("/user/data", userAuth, (req, res) => {
    res.send("user data sent");
});

app.get("/admin/getallData", (req, res) => {
    res.send("All Data send");
});




app.listen(7777, () => {
    console.log("server is listening on port 7777...o");
});
