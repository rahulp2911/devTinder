const validator = require("validator")

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not Valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not Valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not Valid");
    }
}

const validateEditProfileData = (req) => {
    const allowEditFields = ["firstName", "lastName", "emailId", "age", "gender", "photoUrl", "about", "skills"];
    const isEditAllow = Object.keys(req.body).every((field) => allowEditFields.includes(field));
    return isEditAllow;
}



module.exports = {
    validateSignUpData,
    validateEditProfileData
}