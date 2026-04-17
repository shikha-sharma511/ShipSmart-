const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middlewares/auth");

// ================= GET ALL ORDERS =================
router.get("/orders", auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("product")
      .populate("buyer", "name email")
      .populate("seller", "name company")
      .populate("deliveryAgent");

    res.json({ data: orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= APPROVE ORDER =================
router.put("/orders/:id/approve", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    res.json({ data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ASSIGN DELIVERY =================
router.put("/orders/:id/assign", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const { deliveryAgentId } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        deliveryAgent: deliveryAgentId,
        status: "Out for Delivery"
      },
      { new: true }
    );

    res.json({ data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark as delivered
router.put("/orders/:id/delivered", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Delivered" },
      { new: true }
    );

    res.json({ data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;