const express = require('express');
const {
    createCoupon,
    getAllCoupons,
    applyCoupon,
    getCouponById,
    updateCoupon,
} = require('../Controller/Coupon');

const router = express.Router();

router.post('/create', createCoupon);
router.get('/getdata', getAllCoupons);
router.post('/apply', applyCoupon);
router.get('/updatebyid/:id', getCouponById);
router.put('/update/:id', updateCoupon);

module.exports = router;
