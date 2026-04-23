const mongoose = require("mongoose");



const obj = {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
}

const userSchema = new mongoose.Schema(obj);



const User =  mongoose.model("User", userSchema);

module.exports = User