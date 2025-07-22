const Order = require('../../models/Order');

const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
  
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch all orders' });
    }
  };
  module.exports = { getAllOrders};