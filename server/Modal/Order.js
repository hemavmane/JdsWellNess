const mongoose = require("mongoose");
const Product = require("./Product");
const OrderSchema = new mongoose.Schema(
  {
    OrderId: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    ProductDetails: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default:"Initiated"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
