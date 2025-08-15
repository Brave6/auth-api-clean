const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// GET /api/user/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
    return res.status(400).json({ message: 'Invalid token payload' });
}
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
