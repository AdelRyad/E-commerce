const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    token: String
});
userSchema.pre('save', async function (next)
{
    const salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password, salt);

    next();
});



const UsereModel = mongoose.model("user", userSchema);

module.exports = UsereModel;

