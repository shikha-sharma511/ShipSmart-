const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middlewares/auth");

router.get("/orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate("product")
      .populate("seller", "name");
      
    res.json({ data: orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
