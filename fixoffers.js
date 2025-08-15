// fixOffers.js
const mongoose = require("mongoose");
const Offer = require("./models/Offer"); // adjust path if needed

mongoose.connect("mongodb://localhost:27017/authDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const offers = await Offer.find();
    for (const offer of offers) {
      if (offer.productId && !offer.product) {
        offer.product = offer.productId;
        offer.productId = undefined;
        await offer.save();
        console.log(`✅ Updated: ${offer.title}`);
      }
    }
    mongoose.disconnect();
  })
  .catch(err => console.error(err));

  