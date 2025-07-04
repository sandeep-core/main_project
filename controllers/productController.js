const Product = require('../models/Product');

// Get All Products
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get Product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};
