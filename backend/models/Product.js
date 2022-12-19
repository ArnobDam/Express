const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
        type: String
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Product', productSchema);