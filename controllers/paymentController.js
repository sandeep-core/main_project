const Payment = require('../models/Payment');

// Create Payment Record
const createPayment = async (req, res) => {
  const { amount, method, orderId } = req.body;

  const payment = await Payment.create({
    user: req.user._id,
    amount,
    method,
    order: orderId,
  });

  res.status(201).json(payment);
};

// Get Payment History
const getPaymentHistory = async (req, res) => {
  const payments = await Payment.find({ user: req.user._id });
  res.json(payments);
};

module.exports = {
  createPayment,
  getPaymentHistory,
};
