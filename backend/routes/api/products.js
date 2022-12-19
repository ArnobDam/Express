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
  catch (err) {
    return res.json([]);
  }
});

// GET PRODUCT
router.get('/:productId', async (req, res, next) => {
  // res.json({ message: "GET /product" });
  let product;
  try {
    product = await Product.findById(req.params.productId)
    return res.json(product)
  } catch (err) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    error.errors = { message: "No product found with that id " };
    return next(error);
  }

});

// CREATE PRODUCT
router.post('/', async (req, res, next) => {
  // res.json({ message: "POST /product" });
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });

    let product = await newProduct.save();
    product = await product.populate('_id, name', 'price', 'description', 'imageUrl');
    return res.json(product);
  }
  catch (err) {
    const error = new Error("Product can't be created.")
    error.statusCode = 422;
    error.errors = { message: "Invalid product input values."}
    return next(error);
  }
});

// UPDATE PRODUCT
router.patch('/:product_id', async (req, res, next) => {
  res.json({ message: "PATCH /product" });
});

// UPDATE PRODUCT
router.put('/:product_id', async (req, res, next) => {
  res.json({ message: "PUT /product" });
});

// DELETE PRODUCT
router.delete('/:product_id', async (req, res, next) => {
  res.json({ message: "DELETE /product" });
});

module.exports = router;