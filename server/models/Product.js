const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    tittle: String,
    category: String,
    desc: String,
    amount: String,
    price: String
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
