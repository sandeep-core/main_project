const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const topProduct = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.productId", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      topProduct: topProduct[0]?._id || "N/A",
      recentOrders,
      monthlyRevenue: [],  // optional for chart
      productSales: []     // optional for chart
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};

module.exports = { getAdminDashboard };
