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
    const order = await Order.find();
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

    const order = await Order.findById(req.params.orderId)

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
  // res.json({ message: "POST /order" });
  const TAX_AMOUNT = 8.875;
  try {
    const productIdArray = [];
    const productNameArray = [];
    const productsCount = {};
    let priceSubTotal = 0;

    for (const product of req.body.products) {
      productIdArray.push(product._id);
    }

    productIdArray.forEach(id => {
        productsCount[id] = (productsCount[id] || 0) + 1;
    });

    // console.log(productsCount)

    await Product.find({
      _id: { $in: productIdArray },
    }).then((products) => {
      for (const product of products) {
        let productObject = {}
        productObject["_id"] = product._id;
        productObject["name"] = product.name;
        productObject["quantity"] = productsCount[product._id];
        // a[product.name] = productsCount[product._id]
        productNameArray.push(productObject);
        // productNameArray.push(productsCount[product._id]);
        priceSubTotal += product.price;
      }
    });
    
    // console.log(productNameArray);
    
    req.body.discountPercentage ? priceSubTotal -= priceSubTotal * (req.body.discountPercentage / 100) : priceSubTotal;
    console.log(priceSubTotal)

    const newOrder = new Order({
      number: Date.now(),
      discountPercentage: req.body.discountPercentage,
      totalPrice: priceSubTotal * (1 + (TAX_AMOUNT/100)),
      subTotal: priceSubTotal,
      tax: TAX_AMOUNT,
      products: productNameArray,
    });

    // const newOrder = new Order({
    //   number: req.body.number,
    //   discountPercentage: req.body.discountPercentage,
    //   totalPrice: req.body.totalPrice,
    //   subTotal: req.body.subTotal,
    //   tax: req.body.tax,
    //   products: req.body.products,
    // });

    let order = await newOrder.save();
    // product = await product.populate('_id, name', 'price', 'description', 'imageUrl');
    return res.json(order);
  } catch (err) {
    const error = new Error("Order can't be created.");
    error.statusCode = 422;
    error.errors = { message: "Invalid order input values." };
    return next(error);
  }
});

// UPDATE ORDER
router.patch("/:orderId", validateOrderInput, async (req, res, next) => {
  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      title: req.body.title,
    },
    { new: true }
  )
    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      const error = new Error("Order can't be updated.");
      error.statusCode = 422;
      error.errors = { message: "Invalid order input values." };
      return next(error);
    });
});

// UPDATE ORDER
router.put("/:orderId", validateOrderInput, async (req, res, next) => {
  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      title: req.body.title,
    },
    { new: true }
  )
    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      const error = new Error("Order can't be updated.");
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
      return res.json("Goodbye order.");
    })
    .catch((err) => {
      const error = new Error("Order cannot all be deleted.");
      error.statusCode = 422;
      error.errors = { message: "Order are not found." };
      return next(error);
    });
});

module.exports = router;
