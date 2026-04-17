const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Route imports
const authRoutes = require("./routes/auth");
const sellerRoutes = require("./routes/seller");
const adminRoutes = require("./routes/admin");
const buyerRoutes = require("./routes/buyer");

// Models
const User = require("./models/User");
const DeliveryAgent = require("./models/DeliveryAgent");

const app = express();

const path = require("path");

// ================== MIDDLEWARE ==================
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================== ROUTES ==================
app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/buyer", buyerRoutes);

// ================== BUYERS ==================
app.get("/api/buyers", async (req, res) => {
  try {
    const buyers = await User.find({ role: "buyer" }, "-password");
    res.json({ data: buyers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELIVERY AGENTS =================
app.post("/api/delivery-agents", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Agent name is required" });
    }
    const agent = new DeliveryAgent({ name: name.trim() });
    const savedAgent = await agent.save();
    res.status(201).json({ data: savedAgent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/delivery-agents", async (req, res) => {
  try {
    const agents = await DeliveryAgent.find().sort({ createdAt: -1 });
    res.json({ data: agents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================== ROOT ==================
app.get("/", (req, res) => {
  res.json({ message: "Logistics Backend Running 🚀", status: "ok" });
});

// ================== 404 HANDLER ==================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================== GLOBAL ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// ================== DATABASE ==================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });