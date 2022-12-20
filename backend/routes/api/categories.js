const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");

const validateCategoryInput = require("../../validations/categories");

const ObjectId = require("mongoose").Types.ObjectId;

// GET ALL CATEGORIES
router.get("/", async (req, res, next) => {
  // res.json({ message: "GET /categories" });
  try {
    const categories = await Category.find();
    // .populate("name", "price", "description")
    // .sort({ createdAt: 1 });

    return res.json(categories);
  } catch (err) {
    return res.json([]);
  }
});

// GET CATEGORY
router.get("/:categoryId", async (req, res, next) => {
  // res.json({ message: "GET /category" });
  try {
    // const category = await Category.findById(req.params.categoryId)
    console.log(req.params.categoryId);

    const products = await Product.find({
      category: new ObjectId(req.params.categoryId),
    }).populate("category", "_id, title");

    // .populate("categoryId", )
    return res.json(products);
  } catch (err) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    error.errors = { message: "No category found with that id" };
    return next(error);
  }
});

// CREATE CATEGORY
router.post("/", validateCategoryInput, async (req, res, next) => {
  // res.json({ message: "POST /category" });
  try {
    const newCategory = new Category({
      title: req.body.title,
    });

    let category = await newCategory.save();
    // product = await product.populate('_id, name', 'price', 'description', 'imageUrl');
    return res.status(201).json(category);
  } catch (err) {
    const error = new Error("Category can't be created.");
    error.statusCode = 422;
    error.errors = { message: "Invalid category input values." };
    return next(error);
  }
});

// UPDATE CATEGORY
router.patch("/:categoryId", validateCategoryInput, async (req, res, next) => {
  Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      title: req.body.title,
    },
    { new: true }
  )
    .then((category) => {
      return res.json(category);
    })
    .catch((err) => {
      const error = new Error("Category can't be updated.");
      error.statusCode = 422;
      error.errors = { message: "Invalid category input values." };
      return next(error);
    });
});

// UPDATE CATEGORY
router.put("/:categoryId", validateCategoryInput, async (req, res, next) => {
  Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      title: req.body.title,
    },
    { new: true }
  )
    .then((category) => {
      return res.json(category);
    })
    .catch((err) => {
      const error = new Error("Category can't be updated.");
      error.statusCode = 422;
      error.errors = { message: "Invalid category input values." };
      return next(error);
    });
});

// DELETE CATEGORY
router.delete("/:categoryId", async (req, res, next) => {
  // res.json({ message: "DELETE /category" });

  Category.findByIdAndDelete(req.params.categoryId)
    .then((category) => {
      return res.json(category);
    })
    .catch((err) => {
      const error = new Error("Category can't be deleted.");
      error.statusCode = 422;
      error.errors = { message: "Category can't be found." };
      return next(error);
    });
});

// DELETE ALL CATEGORIES
router.delete("/", async (req, res, next) => {
  Category.deleteMany({})
    .then(() => {
      return res.json("Goodbye categories.");
    })
    .catch((err) => {
      const error = new Error("Categories cannot all be deleted.");
      error.statusCode = 422;
      error.errors = { message: "Categories are not found." };
      return next(error);
    });
});

module.exports = router;
