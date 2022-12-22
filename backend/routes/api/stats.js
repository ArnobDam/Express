const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

// GET TOTAL REVENUE
router.get("/revenue", async (req, res, next) => {
  try {
    let orders;

    if (req.query.tf === "ATD") {
      orders = await Order.aggregate([
        {
          $group: {
            _id: {
              $year: "$createdAt",
            },
            yearlyRevenue: { $sum: "$totalPrice" },
          },
        },
      ]);

      return res.json(orders);
    } else if (req.query.tf === "MTD") {
      orders = await Order.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalMonthlyRevenue: { $sum: "$totalPrice" },
          },
        },
      ]);
      return res.json(orders);
    } else {
      let totalRevenue = 0;
      orders = await Order.find();
      for (const order of orders) {
        totalRevenue += order.totalPrice;
      }
      return res.json(totalRevenue);
    }
  } catch (err) {
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
