const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const ProductIdSchema = new Schema(
//   {
//     name: String,
//     quantity: Number
//   }
// );

const arrayLimit = (val) => {
  return val.length < 1;
};

const orderSchema = Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: false,
      min: 0,
      max: 100,
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
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.path("products").validate((products) => {
  if (products.length === 0) {
    return false;
  } else {
    return true;
  }
}, "validation");

module.exports = mongoose.model("Order", orderSchema);
