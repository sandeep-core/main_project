
const express = require('express');
const router = express.Router();
const { createSubscription, getMySubscriptions } = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');

router.post('/', auth, createSubscription);
router.get('/my-subscriptions', auth, getMySubscriptions);

module.exports = router;
