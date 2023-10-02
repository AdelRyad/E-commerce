const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String
});

const UsereModel = mongoose.model("user", userSchema);

module.exports = UsereModel;

