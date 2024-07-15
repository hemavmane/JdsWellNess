const express = require('express');
const {
    createOrder,
    getAllOrders,
    updateOrder,
} = require('../Controller/order');

const router = express.Router();

router.post('/create', createOrder);
router.get('/getdata', getAllOrders);


router.put('/update/:id', updateOrder);

module.exports = router;
