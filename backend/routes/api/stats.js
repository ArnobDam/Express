const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

// GET TOTAL REVENUE
router.get("/revenue", async (req, res, next) => {
  try {
    let totalRevenue = 0;
    let orders;
    let dividedRevenue = [];

    if (req.query.tf === "ATD") {
      // orders = await Order.find().sort({createdAt: 1});
      orders = await Order.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalMonthlyRevenue: { $sum: "$totalPrice" },
          },
        },
      ]);
      totalRevenue = orders[0].totalMonthlyRevenue;
      console.log(orders);
      // orders.length / 10 (10 divisions of orders)
      //loop through each of those divisions
      //sum the revenue of those divisions
      //plot those revenue sums
    } else if (req.query.tf === "YTD") {
      orders = await Order.find({ createdAt: {} });
    } else {
      orders = await Order.find();
      for (const order of orders) {
        totalRevenue += order.totalPrice;
      }
    }


    return res.json(totalRevenue);
  } catch (err) {
    // console.log("test")
    const error = new Error("No records found");
    error.statusCode = 404;
    error.errors = { message: "You have no avaialble orders at this time." };
    return next(error);
  }
});

// GET TOTAL # OF ORDERS
router.get("/number-of-orders", async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalNumberOfOrders = orders.length;

    // for (const order of orders) {
    //     totalRevenue += order.totalPrice;
    // }

    return res.json(totalNumberOfOrders);
  } catch (err) {
    const error = new Error("No records found");
    error.statusCode = 404;
    error.errors = { message: "You have no avaialble orders at this time." };
    return next(error);
  }
});

//GET TOTAL # OF PRODUCTS SOLD
router.get("/number-of-products-sold", async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalNumberOfProductsSold = 0;

    for (const order of orders) {
      for (const product of order.products) {
        totalNumberOfProductsSold += product.quantity;
      }
    }

    return res.json(totalNumberOfProductsSold);
  } catch (err) {
    const error = new Error("No records found");
    error.statusCode = 404;
    error.errors = { message: "You have no avaialble orders at this time." };
    return next(error);
  }
});

//GET MOST POPULAR ITEMS (ALL ITEMS ORDERED)
router.get("/popular", async (req, res, next) => {
  try {
    const orders = await Order.find();

    let allItems = [];
    let allItemsHash = {};

    for (const order of orders) {
      for (const product of order.products) {
        if (allItemsHash[product.name]) {
          allItemsHash[product.name].count += product.quantity;
          allItemsHash[product.name].revenue += product.totalPrice;
        } else {
          allItemsHash[product.name] = {
            count: product.quantity,
            revenue: product.totalPrice,
          };
        }
      }
    }

    return res.json(allItemsHash);
  } catch (err) {
    const error = new Error("No records found");
    error.statusCode = 404;
    error.errors = { message: "You have no avaialble orders at this time." };
    return next(error);
  }
});

module.exports = router;
