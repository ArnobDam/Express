const express = require("express");
const router = express.Router();
const busboy = require("connect-busboy");
const path = require("path");
const fs = require("fs-extra");

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

const validateProductInput = require("../../validations/products");

// GET ALL PRODUCTS
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res.json([]);
  }
});

// GET PRODUCT
router.get("/:productId", async (req, res, next) => {
  let product;

  try {
    product = await Product.findById(req.params.productId);
    return res.json(product);
  } catch (err) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    error.errors = { message: "No product found with that id" };
    return next(error);
  }
});

const imagePath = path.join(__dirname, "../../public/uploads");
fs.ensureDir(imagePath);

// CREATE PRODUCT
router.post("/", busboy({ immediate: true }), async (req, res, next) => {
  let formData = new Map();

  await req.busboy.on("field", (fieldname, value) => {
    formData.set(fieldname, value);
  });

  req.pipe(req.busboy);

  await req.busboy.on("file", (fieldname, file, filename) => {
    const saveTo = path.join(
      imagePath,
      Date.now().toString() + "." + filename.mimeType.slice(6)
    );
    formData.set("imageUrl", saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });

  await req.busboy.on("finish", async () => {
    // console.log("upload finished :)");
    try {
      const newProduct = new Product({
        name: formData.get("name"),
        category: formData.get("category"),
        price: formData.get("price"),
        description: formData.get("description"),
        imageUrl: formData.get("imageUrl"),
      });
      let product = await newProduct.save();
      return res.json(product);
    } catch (err) {
      const error = new Error("Product can't be created.");
      error.statusCode = 422;
      error.errors = { message: "Invalid product input values." };
      return next(error);
    }
  });
});

// UPDATE PRODUCT
router.patch("/:productId", validateProductInput, async (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    },
    { new: true }
  )
    .then((docs) => {
      return res.json(docs);
    })
    .catch((err) => {
      const error = new Error("Product can't be updated.");
      error.statusCode = 422;
      error.errors = { message: "Invalid product input values." };
      return next(error);
    });
});

// UPDATE PRODUCT
router.put("/:productId", validateProductInput, async (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    },
    { new: true }
  )
    .then((product) => {
      return res.json(product);
    })
    .catch((err) => {
      const error = new Error("Product can't be updated.");
      error.statusCode = 422;
      error.errors = { message: "Invalid product input values." };
      return next(error);
    });
});

// DELETE PRODUCT
router.delete("/:productId", async (req, res, next) => {
  // res.json({ message: "DELETE /product" });

  Product.findByIdAndDelete(req.params.productId)
    .then((product) => {
      return res.json(product);
    })
    .catch((err) => {
      const error = new Error("Product can't be deleted.");
      error.statusCode = 422;
      error.errors = { message: "Product can't be found." };
      return next(error);
    });
});

// DELETE ALL PRODUCTS
router.delete("/", async (req, res, next) => {
  Product.deleteMany({})
    .then(() => {
      return res.json("Goodbye food.");
    })
    .catch((err) => {
      const error = new Error("Products cannot all be deleted.");
      error.statusCode = 422;
      error.errors = { message: "Products are not found." };
      return next(error);
    });
});

module.exports = router;
