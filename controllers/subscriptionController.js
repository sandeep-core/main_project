const Subscription = require('../models/Subscription');

// Create Subscription
const createSubscription = async (req, res) => {
  const { productId, interval, quantity } = req.body;

  const subscription = await Subscription.create({
    user: req.user._id,
    product: productId,
    interval,
    quantity,
  });

  res.status(201).json(subscription);
};

// Get Subscriptions for Logged-In User
const getMySubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find({ user: req.user._id }).populate('product');
  res.json(subscriptions);
};

module.exports = {
  createSubscription,
  getMySubscriptions,
};
