const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPaymentHistory,
  createRazorpayOrder
} = require('../controllers/paymentController');
const auth = require('../middleware/auth');


router.post('/create-order', auth, createRazorpayOrder);
router.post('/', auth, createPayment);
router.get('/history', auth, getPaymentHistory);

module.exports = router;
