const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const Product = mongoose.model("Product");

const validateOrderInput = require("../../validations/orders");

const ObjectId = require("mongoose").Types.ObjectId;

// GET ALL ORDERS
router.get("/", async (req, res, next) => {
  // res.json({ message: "GET /order" });
  try {
    const order = await Order.find().limit(10).sort({ createdAt: -1 });
    // .populate("name", "price", "description")
    // .sort({ createdAt: 1 });

    return res.json(order);
  } catch (err) {
    return res.json([]);
  }
});

// GET ORDER
router.get("/:orderId", async (req, res, next) => {
  // res.json({ message: "GET /order" });
  try {
    // const order = await Order.findById(req.params.orderId)
    console.log(req.params.orderId);

    const order = await Order.findById(req.params.orderId);

    // .populate("orderId", )
    return res.json(order);
  } catch (err) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    error.errors = { message: "No order found with that id" };
    return next(error);
  }
});

// CREATE ORDER
router.post("/", validateOrderInput, async (req, res, next) => {
  const TAX_AMOUNT = 8.875;

  try {
    const productIdArray = [];
    const productNameArray = [];
    const productsCount = {};
    let priceSubTotal = 0;

    for (const product of req.body.products) {
      productIdArray.push(product._id);
    }

    productIdArray.forEach((id) => {
      productsCount[id] = (productsCount[id] || 0) + 1;
    });

    await Product.find({
      _id: { $in: productIdArray },
    }).then((products) => {
      for (const product of products) {
        let productObject = {};
        productObject["_id"] = product._id;
        productObject["name"] = product.name;
        productObject["quantity"] = productsCount[product._id];
        productObject["totalPrice"] = product.price * productObject["quantity"];
        productObject["itemPrice"] = product.price;
        productObject["imageUrl"] = product.imageUrl;

        productNameArray.push(productObject);
        priceSubTotal += productObject["totalPrice"];
      }
    });

    req.body.discountPercentage
      ? (priceSubTotal -= priceSubTotal * (req.body.discountPercentage / 100))
      : priceSubTotal;

    const newOrder = new Order({
      number: Date.now(),
      discountPercentage: req.body.discountPercentage,
      totalPrice: priceSubTotal * (1 + TAX_AMOUNT / 100),
      subTotal: priceSubTotal,
      tax: TAX_AMOUNT,
      products: productNameArray,
      notes: req.body.notes,
      // createdAt: req.body.createdAt,
      // updatedAt: req.body.updatedAt,
    });

    let order = await newOrder.save();
    return res.status(201).json(order);
  } catch (err) {
    const error = new Error("Order can't be created.");
    error.statusCode = 422;
    error.errors = { message: "Invalid order input values." };
    return next(error);
  }
});

// UPDATE ORDER
router.patch("/:orderId", validateOrderInput, async (req, res, next) => {
  const TAX_AMOUNT = 8.875;

  const productIdArray = [];
  const productNameArray = [];
  const productsCount = {};
  let priceSubTotal = 0;

  for (const product of req.body.products) {
    productIdArray.push(product._id);
  }

  productIdArray.forEach((id) => {
    productsCount[id] = (productsCount[id] || 0) + 1;
  });

  await Product.find({
    _id: { $in: productIdArray },
  }).then((products) => {
    for (const product of products) {
      let productObject = {};
      productObject["_id"] = product._id;
      productObject["name"] = product.name;
      productObject["quantity"] = productsCount[product._id];
      productObject["itemPrice"] = product.price;
      productObject["imageUrl"] = product.imageUrl;

      productNameArray.push(productObject);
      priceSubTotal += productObject["totalPrice"];
    }
  });

  req.body.discountPercentage
    ? (priceSubTotal -= priceSubTotal * (req.body.discountPercentage / 100))
    : priceSubTotal;

  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      number: Date.now(),
      discountPercentage: req.body.discountPercentage,
      totalPrice: priceSubTotal * (1 + TAX_AMOUNT / 100),
      subTotal: priceSubTotal,
      tax: TAX_AMOUNT,
      products: productNameArray,
      notes: req.body.notes,
    },
    { new: true }
  )
    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      const error = new Error("Order can't be created.");
      error.statusCode = 422;
      error.errors = { message: "Invalid order input values." };
      return next(error);
    });
});

// UPDATE ORDER
router.put("/:orderId", validateOrderInput, async (req, res, next) => {
  const TAX_AMOUNT = 8.875;

  const productIdArray = [];
  const productNameArray = [];
  const productsCount = {};
  let priceSubTotal = 0;

  for (const product of req.body.products) {
    productIdArray.push(product._id);
  }

  productIdArray.forEach((id) => {
    productsCount[id] = (productsCount[id] || 0) + 1;
  });

  await Product.find({
    _id: { $in: productIdArray },
  }).then((products) => {
    for (const product of products) {
      let productObject = {};
      productObject["_id"] = product._id;
      productObject["name"] = product.name;
      productObject["quantity"] = productsCount[product._id];
      productObject["itemPrice"] = product.price;
      productObject["imageUrl"] = product.imageUrl;

      productNameArray.push(productObject);
      priceSubTotal += productObject["totalPrice"];
    }
  });

  req.body.discountPercentage
    ? (priceSubTotal -= priceSubTotal * (req.body.discountPercentage / 100))
    : priceSubTotal;

  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      number: Date.now(),
      discountPercentage: req.body.discountPercentage,
      totalPrice: priceSubTotal * (1 + TAX_AMOUNT / 100),
      subTotal: priceSubTotal,
      tax: TAX_AMOUNT,
      products: productNameArray,
      notes: req.body.notes,
    },
    { new: true }
  )
    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      const error = new Error("Order can't be created.");
      error.statusCode = 422;
      error.errors = { message: "Invalid order input values." };
      return next(error);
    });
});

// DELETE ORDER
router.delete("/:orderId", async (req, res, next) => {
  // res.json({ message: "DELETE /order" });

  Order.findByIdAndDelete(req.params.orderId)
    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      const error = new Error("Order can't be deleted.");
      error.statusCode = 422;
      error.errors = { message: "Order can't be found." };
      return next(error);
    });
});

// DELETE ALL ORDER
router.delete("/", async (req, res, next) => {
  Order.deleteMany({})
    .then(() => {
      return res.json("Goodbye orders.");
    })
    .catch((err) => {
      const error = new Error("Orders cannot all be deleted.");
      error.statusCode = 422;
      error.errors = { message: "Orders are not found." };
      return next(error);
    });
});

module.exports = router;
