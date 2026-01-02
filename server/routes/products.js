const router = require('express').Router();
const Product = require('../models/Product');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products.map(p => ({ ...p._doc, id: p._id })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET ONE
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json({ ...product._doc, id: product._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADD

router.post('/', async (req, res) => {
  console.log("🔔 Add Product route hit!");
  console.log("📦 Data received:", req.body); // <--- See what the frontend sent

  try {
    // 1. Check if sellerId is missing (Common Error)
    if (!req.body.sellerId) {
      console.error("❌ Error: Missing sellerId!");
      return res.status(400).json({ message: "Product must have a sellerId" });
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    
    console.log("✅ Product saved successfully!");
    res.json({ ...savedProduct._doc, id: savedProduct._id });
  } catch (err) {
    console.error("❌ Save failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ ...updated._doc, id: updated._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;