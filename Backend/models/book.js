const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: String,
  authorName: String,
  description: String,
  pages: Number,
  price: Number,
  coverPhoto: String,
  secondaryImage: String,
  thirdImage: String,
  sellerName: String,  // New field for seller name
  sellerId: mongoose.Schema.Types.ObjectId,  // New field for seller ID
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
