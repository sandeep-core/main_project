const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

const getAdminDashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  res.json({
    users: totalUsers,
    products: totalProducts,
    orders: totalOrders,
  });
};

module.exports = { getAdminDashboard };
