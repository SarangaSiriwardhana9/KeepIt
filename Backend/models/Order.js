const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false, 
  },
  isDispatched: {
    type: Boolean,
    default: false,
  },
  isReceived: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
