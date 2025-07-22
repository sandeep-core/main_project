
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash on Delivery', 'Online Payment']
  },
  createdAt : {
    type: Date,
    default: Date.now,
  }}
);

module.exports = mongoose.model('Order', orderSchema);
