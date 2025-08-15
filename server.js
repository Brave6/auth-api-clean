const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/products.js'); 
const bookingRoutes = require('./routes/bookingRoutes.js'); 
const offerRoutes = require('./routes/offersRoutes.js');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/bookings', bookingRoutes); 
app.use('/api/offers', offerRoutes);
app.use('/api/user', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000; // ✅ fallback for local
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`🚀 Server running at http://0.0.0.0:${PORT}`)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));
