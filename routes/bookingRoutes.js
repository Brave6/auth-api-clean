const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth'); // ✅ JWT middleware

// GET /api/bookings - get only bookings for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }) // ✅ filter by logged-in user
      .populate({
        path: 'productId',
        model: 'Product',
        select: 'title price duration description imageUrl discountedPrice'
      });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Fetching bookings failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/bookings - create booking for logged-in user
router.post('/', auth, async (req, res) => {
  try {
    const { name, phone, date, time, productId } = req.body;

    if (!name || !phone || !date || !time || !productId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBooking = new Booking({
      name,
      phone,
      date,
      time,
      productId,
      userId: req.user.id // ✅ attach logged-in user's ID
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
