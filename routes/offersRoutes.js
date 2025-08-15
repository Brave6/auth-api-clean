const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");

// GET all offers with populated product and discounted price
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find().populate("product");

    const offersWithDiscount = offers.map(offer => {
      const product = offer.product;
      let discountedPrice = null;

      if (product && typeof product.price === 'number') {
        const discount = (product.price * offer.discountPercent) / 100;
        discountedPrice = product.price - discount;
      }

      return {
        ...offer._doc,
        discountedPrice,
      };
    });

    res.json(offersWithDiscount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new offer
router.post("/", async (req, res) => {
  const { title, description, discountPercent, validUntil, product } = req.body;

  const offer = new Offer({
    title,
    description,
    discountPercent,
    validUntil,
    product, // this should be the ObjectId of the product
  });

  try {
    const savedOffer = await offer.save();
    res.status(201).json(savedOffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
