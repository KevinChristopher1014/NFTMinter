const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
    },
    wallet_address: {
        type: String,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;