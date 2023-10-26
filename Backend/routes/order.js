const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/create', async (req, res) => {
  try {
    const {
      bookId,
      userId,
      sellerId,
      totalPrice,
      isAccepted,
      isDispatched,
      isReceived,
    } = req.body;

    const newOrder = new Order({
      bookId,
      userId,
      sellerId,
      totalPrice,
      isAccepted,
      isDispatched,
      isReceived,
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a list of all orders
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an order by ID (e.g., to mark as accepted, dispatched, or received)
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order properties as needed
    if (req.body.isAccepted !== undefined) {
      order.isAccepted = req.body.isAccepted;
    }
    if (req.body.isDispatched !== undefined) {
      order.isDispatched = req.body.isDispatched;
    }
    if (req.body.isReceived !== undefined) {
      order.isReceived = req.body.isReceived;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
