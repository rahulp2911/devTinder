const express = require("express")
const app = express();

// app.use("/users", (req, res) => { // this will match all the "all htttp methos" to api 
//     res.send("okkkk");
// });

app.get("/users", (req, res) => {
    res.send({"fname":"Rahul","lname":"Patil"});
});

app.post("/users", (req, res) => {
    res.send("added some data");
});

app.delete("/users", (req, res) => {
    res.send("deleted data");
});




app.listen(7777, () => {
    console.log("server is listening on port 7777...o");
});
 