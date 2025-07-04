const Order = require('../models/Order');

// Create New Order
const createOrder = async (req, res) => {
  const { products, totalAmount, paymentMethod } = req.body;

  const order = await Order.create({
    user: req.user._id,
    products,
    totalAmount,
    paymentMethod,
  });

  res.status(201).json(order);
};

// Get Orders of Logged-In User
const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

module.exports = {
  createOrder,
  getUserOrders,
};
