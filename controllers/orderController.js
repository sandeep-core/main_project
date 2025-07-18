const Order = require('../models/Order');

// Create New Order
const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' });
    }

    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
module.exports = {
  createOrder,
  getUserOrders,
};
