const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const ProductIdSchema = new Schema(
//   { 
//     name: String,
//     quantity: Number 
//   }
// );

const orderSchema = Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: false,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
