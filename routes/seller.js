const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ================= ADD PRODUCT =================
router.post("/add-product", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const sellerId = req.user.id;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required" });
    }

    const product = new Product({
      name,
      price,
      category: category || "General",
      stock: stock ? Number(stock) : 0,
      description: description || "",
      imageUrl: imageUrl || "",
      seller: sellerId
    });

    const savedProduct = await product.save();

    res.json({
      message: "Product added successfully",
      data: savedProduct
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET SELLER PRODUCTS =================
router.get("/products", auth, async (req, res) => {
  try {
    // If Admin, maybe return all. If Seller, return only theirs. If Buyer, return all active.
    let query = {};
    if (req.user.role === "seller") {
      query.seller = req.user.id;
    }
    const products = await Product.find(query);
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE PRODUCT =================
router.delete("/products/:id", auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= CREATE ORDER =================
// Usually called by Buyer
router.post("/create-order", auth, async (req, res) => {
  try {
    const { productId, sellerId } = req.body;

    if (!productId || !sellerId) {
      return res.status(400).json({ message: "Product and Seller info required" });
    }

    // Create Order
    const order = new Order({
      product: productId,
      buyer: req.user.id,
      seller: sellerId
    });

    const savedOrder = await order.save();

    res.json({
      message: "Order created successfully",
      data: savedOrder
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;