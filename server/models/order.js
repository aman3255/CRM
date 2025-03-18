const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: String,
    email: String,
    phone: String,
    items: [{ name: String, price: Number, quantity: Number }],
    totalAmount: Number,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
