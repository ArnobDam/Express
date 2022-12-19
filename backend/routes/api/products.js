const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// GET ALL PRODUCTS
router.get('/', async (req, res, next) => {
  // res.json({ message: "GET /products" });
  try {
    const products = await Product.find()
    .populate("_id, name", "price", "description", "image")
    .sort({ name: 1 });

    return res.json(products);
  }
  catch(err) {
    return res.json([]);
  }
});

// GET PRODUCT
router.get('/:product_id', function(req, res, next) {
  res.json({ message: "GET /product" });
});

// MAKE PRODUCT
router.post('/new', function(req, res, next) {
  res.json({ message: "POST /product" });
});

// UPDATE PRODUCT
router.patch('/:product_id', function(req, res, next) {
  res.json({ message: "PATCH /product" });
});

// UPDATE PRODUCT
router.put('/:product_id', function(req, res, next) {
  res.json({ message: "PUT /product" });
});

// DELETE PRODUCT
router.delete('/:product_id', function(req, res, next) {
  res.json({ message: "DELETE /product" });
});

module.exports = router;