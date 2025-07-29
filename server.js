const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();


const connectDB = require('./config/db.js');

// Route Imports
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const subscriptionRoutes = require('./routes/subscriptions');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat');
const contactRoutes = require('./routes/contact');


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static HTML files
app.use(express.static(path.join(__dirname, 'views')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/admin', adminRoutes); // handles /admin/dashboard etc.
app.use('/api/chat', chatRoutes);
app.use('/api/contact', contactRoutes);

// Serve Static HTML Routes (views/home.html etc.)
app.get('/', (req, res) => {
  const { prompt } = req.body;
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});
// app.get('/check', (req, res) => {
//   res.send('OK');
// });
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-login.html'));
});

app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
});

// Error Handling
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});
// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`chal gaya  Server is  on http://localhost:${PORT}`);
  });
