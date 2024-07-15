const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(err => {
    console.log(err, "failed to connect to database");
  });

// Middleware
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173'], // React app domain
  credentials: true
}));


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));

// Routes
const Auth = require("./Router/auth");
const ProductRoutes = require("./Router/Product");
const user = require("./Router/user");
const coupon = require("./Router/Coupon");
const Order = require("./Router/Order");


app.use("/api/auth", Auth);
app.use("/api/product", ProductRoutes);
app.use("/api/user", user);
app.use("/api/coupons", coupon);
app.use("/api/order", Order);
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
