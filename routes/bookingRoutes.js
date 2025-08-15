const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate({
      path: 'productId',
      model: 'Product',     // ✅ explicitly define model name
      select: 'title price duration description imageUrl discountedPrice' // ✅ all you want to return
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Fetching bookings failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/', async (req, res) => {
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
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
