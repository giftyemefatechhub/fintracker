const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define AdminUser Schema
const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create AdminUser Model
const AdminUser = mongoose.model('AdminUser', adminUserSchema);

// Admin Login Route
router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username and password match
    const user = await AdminUser.findOne({ username, password });
    if (user) {
      // Successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Failed login
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
