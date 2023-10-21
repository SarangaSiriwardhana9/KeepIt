// models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: String,
  authorName: String,
  description: String,
  pages: Number,
  price: Number, // Add a price field
  coverPhoto: String,
  secondaryImage: String,
  thirdImage: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
