const mongoose = require("mongoose");
const validator = require("validator")



const obj = {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value)
            }
        },
    },
    password: {
        type: String,
        requred: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: " + value)
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo URL:" + value)
            }
        },
    },
    about: {
        type: String,
        default: "This is a default about the user"
    },
    skills: {
        type: [String],
    },
}


const userSchema = new mongoose.Schema(obj, { timestamps: true });



const User = mongoose.model("User", userSchema);

module.exports = User