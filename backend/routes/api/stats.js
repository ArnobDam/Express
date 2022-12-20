const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

// GET TOTAL REVENUE
router.get("/revenue", async (req, res, next) => {

    try {
        const orders = await Order.find();

        let totalRevenue = 0;

        for (const order of orders) {
            totalRevenue += order.totalPrice;
        }

        return res.json(totalRevenue);
    } catch (err) {
        const error = new Error("No records found");
        error.statusCode = 404;
        error.errors = { message: "You have no avaialble orders at this time." };
        return next(error);
    }
});



module.exports = router;