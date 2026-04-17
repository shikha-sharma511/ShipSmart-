const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    vehicleNumber: String,
    available: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("DeliveryAgent", deliveryAgentSchema);