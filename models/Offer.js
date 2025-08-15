const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  title: String,
  description: String,
  discountPercent: Number,
  validUntil: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product" // This enables .populate()
  }
});

module.exports = mongoose.model("Offer", OfferSchema);
