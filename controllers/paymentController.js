const Razorpay = require('razorpay');
const Payment = require('../models/Payment');

    // Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // 1️⃣ Create Razorpay Order for frontend
    const createRazorpayOrder = async (req, res) => {
      const { amount } = req.body;

      if (!amount) {
        return res.status(400).json({ message: "Amount is required" });
      }

      try {
        const options = {
          amount: amount * 100, 
          currency: "INR",
          receipt: `receipt_order_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.status(201).json({
          success: true,
          orderId: order.id,
          currency: order.currency,
          amount: order.amount
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create Razorpay order" });
      }
    };

    // 2️⃣ Save Payment Record after Razorpay success
    const createPayment = async (req, res) => {
      const { amount, method, orderId } = req.body;

      try {
        const payment = await Payment.create({
          user: req.user._id,
          amount,
          method,
          order: orderId,
        });

        res.status(201).json(payment);
      } catch (err) {
        res.status(500).json({ message: 'Failed to save payment' });
      }
    };

    // 3️⃣ Get user’s payment history
    const getPaymentHistory = async (req, res) => {
      const payments = await Payment.find({ user: req.user._id });
      res.json(payments);
    };

    module.exports = {
      createRazorpayOrder,
      createPayment,
      getPaymentHistory,
    };
