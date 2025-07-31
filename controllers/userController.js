const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// --- Register User ---
const registerUser = async (req, res) => {
  // 1. ADD TRY BLOCK
  try {
    const { name, email, password, role } = req.body;
    console.log('[registerUser] Attempting to register:', { name, email });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('[registerUser] Failure: User already exists.');
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    console.log('[registerUser] Success: User created.');
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  // 2. ADD CATCH BLOCK TO LOG THE ERROR
  } catch (error) {
    console.error("!!! ERROR IN registerUser !!!", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// --- Login User ---
const loginUser = async (req, res) => {
  // 1. ADD TRY BLOCK
  try {
    const { email, password } = req.body;
    console.log('[loginUser] Attempting to login:', { email });

    const user = await User.findOne({ email });
    if (!user) {
        console.log('[loginUser] Failure: Invalid credentials (user not found).');
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('[loginUser] Failure: Invalid credentials (password mismatch).');
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('[loginUser] Success: User authenticated.');
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  // 2. ADD CATCH BLOCK TO LOG THE ERROR
  } catch (error) {
    console.error("!!! ERROR IN loginUser !!!", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// --- Get Profile ---
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error("!!! ERROR IN getUserProfile !!!", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
