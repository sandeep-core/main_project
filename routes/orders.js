// routes/orders.js

const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth, createOrder);
router.get('/my-orders', auth, getUserOrders);

module.exports = router;
