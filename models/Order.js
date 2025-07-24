const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'Razorpay'],
    required: true
  },
  razorpayPaymentId: String,
  razorpayOrderId: String,
  status: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: function () {
      return this.paymentMethod === 'Razorpay' ? 'Paid' : 'Pending';
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
