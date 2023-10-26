const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
 },
 bookId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Book',
  required: true,
 },
});


cartItemSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;