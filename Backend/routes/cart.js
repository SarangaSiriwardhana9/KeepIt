const express = require('express');
const router = express.Router();
const CartItem = require('../models/cart'); // Import the CartItem model

// Create a new cart item or check for duplicates
router.post('/add-to-cart', async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // Check if the user has already added this book to the cart
    const existingCartItem = await CartItem.findOne({ bookId, userId });

    if (existingCartItem) {
      // Book already in the cart
      return res.status(400).json({ message: 'You have already added this book to your cart.' });
    }

    const newCartItem = new CartItem({
      bookId,
      userId,
    });

    const savedCartItem = await newCartItem.save();
    res.json(savedCartItem);
  } catch (err) {
    // Handle other errors, such as database connection issues
    res.status(500).json({ message: err.message });
  }
});

// Get all cart items for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all cart items that belong to the specified user
    const cartItems = await CartItem.find({ userId }).populate('book');

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a book from the user's cart
router.delete('/:id', async (req, res) => {
  try {
    const cartItemId = req.params.id;

    // Remove the cart item with the specified ID
    const removedCartItem = await CartItem.findByIdAndRemove(cartItemId);

    if (!removedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json(removedCartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;