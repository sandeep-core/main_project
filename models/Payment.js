const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  payment_method: { type: String, enum: ['UPI', 'Card', 'NetBanking', 'COD'] },
  payment_date: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success' }
});

module.exports = mongoose.model('Payment', paymentSchema);
