const express = require('express');
const router = express.Router();

const Order = require('../models/Order');

// Create a new order
router.post('/create', async (req, res) => {
  try {
    const {
      bookId,
      buyerId,
      sellerId,
      totalPrice,
      isAccepted,
      isDispatched,
      isReceived,
    } = req.body;

    const newOrder = new Order({
      bookId,
      buyerId,
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

// Get all orders by buyerId
router.get('/all', async (req, res) => {
  try {
    const buyerId = req.query.buyerId; // Extract buyerId from the query parameter

    if (!buyerId) {
      return res.status(400).json({ message: 'BuyerId is required in the query parameter.' });
    }

    const orders = await Order.find({ buyerId }); // Filter orders by buyerId
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update isReceived status for an order
router.put('/received/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { isReceived: true }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get isReceived status for an order
router.get('/isReceived/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ isReceived: order.isReceived });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders by sellerId
router.get('/sales', async (req, res) => {
  try {
    const sellerId = req.query.sellerId; // Extract sellerId from the query parameter

    if (!sellerId) {
      return res.status(400).json({ message: 'SellerId is required in the query parameter.' });
    }

    const sales = await Order.find({ sellerId }); // Filter orders by sellerId
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update "isAccepted" status for an order
router.put('/accepted/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { isAccepted: true }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Update "isDispatched" status for an order
router.put('/dispatched/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { isDispatched: true }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Updated backend route to check if the order is already accepted
router.get('/isAccepted/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ isAccepted: order.isAccepted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Updated backend route to check if the order is already dispatched
router.get('/isDispatched/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ isDispatched: order.isDispatched });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
