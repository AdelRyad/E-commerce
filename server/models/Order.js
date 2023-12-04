const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    feedback: String,
    products: Array,
    total:String
});

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
