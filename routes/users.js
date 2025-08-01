const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', (req, res, next) => {
  console.log("Register route triggered");
  next();
}, registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUserProfile);
router.get('/', (req, res) => {
    res.json({ message: 'User API working ✅' });
  });
  

module.exports = router;