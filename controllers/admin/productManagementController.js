const Product = require('../../models/Product');

// Update Stock
const updateProductStock = async (req, res) => {
  const { stock } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.stock = stock;
  await product.save();

  res.json({ message: 'Stock updated', product });
};

// Update Price
const updateProductPrice = async (req, res) => {
  const { price } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.price = price;
  await product.save();

  res.json({ message: 'Price updated', product });
};

module.exports = {
  updateProductStock,
  updateProductPrice,
};
