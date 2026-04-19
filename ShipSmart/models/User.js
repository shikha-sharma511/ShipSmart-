const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "seller", "buyer"], 
    required: true 
  },
  company: String, // For Seller
  phone: String,   // For Buyer/Admin
  address: String, // For Buyer/Admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
