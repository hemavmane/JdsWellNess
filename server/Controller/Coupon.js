const CouponModal = require('../Modal/coupon');

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const { code, discount, expirationDate, isActive } = req.body;
    const newCoupon = new CouponModal({ code, discount, expirationDate, isActive });
    let data = await newCoupon.save();
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all active coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await CouponModal.find({ isActive: true });
    res.status(200).json(coupons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Apply a coupon
exports.applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await CouponModal.findOne({ code, isActive: true });
    if (!coupon || coupon.expirationDate < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired coupon' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch a single coupon by ID
exports.getCouponById = async (req, res) => {
  try {
    const coupon = await CouponModal.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    return res.status(200).json(coupon);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a coupon


exports.updateCoupon = async (req, res) => {
  let { code, discount, expirationDate, isActive } =
    req.body;

  try {
    let idd = req.params.id;
    const findCoupon = await CouponModal.findOne({ _id: idd });
    if (!findCoupon) {
      return res.json({ error: "No such record found" });
    }
    findCoupon.code = code || findCoupon.code;
    findCoupon.discount = discount || findCoupon.discount;
    findCoupon.expirationDate = expirationDate || findCoupon.expirationDate;
    findCoupon.isActive = isActive || findCoupon.isActive;

    const updateCopon = await CouponModal.findOneAndUpdate(
      { _id: idd },
      findCoupon,
      { new: true }
    );

    return res.status(200).json({
      message: "Updated successfully",
      data: updateCopon,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the Product" });
  }
};