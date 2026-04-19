const { status } = require("express/lib/response");

const adminAuth = (req, res, next) => {
    console.log("Admin auth getting checking ...");

    const token = "xyz";
    const admnAuthorized = token === "xyz";
    if (!admnAuthorized) {
        res.status(401).send("unothorized requires");
    } else {
        console.log("Admin auth is corrected");
        next();
    }
}


const userAuth = (req, res, next) => {
    console.log("User auth getting checking ...");

    const token = "xyz";
    const admnAuthorized = token === "xyz";
    console.log("admnAuthorized:",admnAuthorized)
    if (!admnAuthorized) {
        res.status(401).send("unothorized requires");
    } else {
        console.log("User auth is corrected");
        next();
    }
}


module.exports = {
    adminAuth,
    userAuth,

}