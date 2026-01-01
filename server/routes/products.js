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
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.json({ ...savedProduct._doc, id: savedProduct._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
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