const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // This should match the model name of your product schema
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
