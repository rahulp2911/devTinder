const mongoose = require("mongoose");


const connectionDB = async () => {
    await mongoose.connect(
        "mongodb+srv://rahulsp2911:KzYC0pKKA0ZTFTUt@rahulnamastenode.dch8ngy.mongodb.net/devTinder"
    );
};


module.exports = connectionDB;