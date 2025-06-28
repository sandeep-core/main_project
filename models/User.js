const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  pincode: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: addressSchema,
  user_signup_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
