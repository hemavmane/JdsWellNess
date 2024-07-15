const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    realPrice: {
      type: Number,
      required: true,
    },
    packsize: {
      type: Number,
    },
    unit: {
      type: String,
    },
    productimage: {
      type: [String],
      required: true,
      trim: true,
    },
    discription: {
      type: Object,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    subtitle: {
      type: Object,
      required: true,
    },
    Reviews: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
