const express = require("express");
const router = express.Router();

// GET ALL PRODUCTS
router.get('/', function(req, res, next) {
  res.json({ message: "GET /products" });
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