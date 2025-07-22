
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/auth');

const { getAdminDashboard } = require('../controllers/admin/adminDashboardController');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/admin/userManagementController');
const { updateProductStock, updateProductPrice,getAllProducts } = require('../controllers/admin/productManagementController');
const { getAllOrders } = require('../controllers/admin/orderController');

router.get('/orders', auth, isAdmin, getAllOrders);

router.get('/dashboard', auth, isAdmin, getAdminDashboard);

router.get('/users', auth, isAdmin, getAllUsers);
router.put('/users/:id', auth, isAdmin, updateUser);
router.delete('/users/:id', auth, isAdmin, deleteUser);

router.get('/products', auth, isAdmin, getAllProducts);
router.put('/products/:id/stock', auth, isAdmin, updateProductStock);
router.put('/products/:id/price', auth, isAdmin, updateProductPrice);

module.exports = router;
