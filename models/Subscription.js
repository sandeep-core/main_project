const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan_name: String,
  product_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  start_date: Date,
  end_date: Date,
  status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
