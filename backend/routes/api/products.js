const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// GET ALL PRODUCTS
router.get('/', async (req, res, next) => {
  // res.json({ message: "GET /products" });
  try {
    const products = await Product.find()
    // .populate("name", "price", "description")
    // .sort({ createdAt: 1 });

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
    // product = await product.populate('_id, name', 'price', 'description', 'imageUrl');
    return res.json(product);
  }
  catch (err) {
    const error = new Error("Product can't be created.")
    error.statusCode = 422;
    error.errors = { message: "Invalid product input values." }
    return next(error);
  }
});

// UPDATE PRODUCT
router.patch('/:productId', async (req, res, next) => {

  Product.findByIdAndUpdate(req.params.productId, {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  }, { new: true }).then((docs) => {
    return res.json(docs);
  }).catch((err) => {
    const error = new Error("Product can't be updated.")
    error.statusCode = 422;
    error.errors = { message: "Invalid product input values." }
    return next(error);
  })

});

// UPDATE PRODUCT
router.put('/:productId', async (req, res, next) => {

  Product.findByIdAndUpdate(req.params.productId, {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  }, { new: true }).then((product) => {
    return res.json(product);
  }).catch((err) => {
    const error = new Error("Product can't be updated.")
    error.statusCode = 422;
    error.errors = { message: "Invalid product input values." }
    return next(error);
  })
  
});

// DELETE PRODUCT
router.delete('/:productId', async (req, res, next) => {
  // res.json({ message: "DELETE /product" });

  Product.findByIdAndDelete(req.params.productId).then((product) => {
    return res.json(product)
  }).catch((err) => {
    const error = new Error("Product can't be deleted.")
    error.statusCode = 422;
    error.errors = { message: "Product can't be found." }
    return next(error);
  })
});

// DELETE ALL PRODUCTS
router.delete('/', async (req, res, next) => {

  Product.deleteMany({}).then(() => {
    return res.json("Goodbye food.")
  }).catch((err) => {
    const error = new Error("Products cannot all be deleted.")
    error.statusCode = 422;
    error.errors = { message: "Products are not found." }
    return next(error);
  })
})

module.exports = router;