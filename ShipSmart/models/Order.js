const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    default: "Pending Approval"
  },
  deliveryAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryAgent"
  }
});

module.exports = mongoose.model("Order", orderSchema);