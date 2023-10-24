const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  seller: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
    },
    fullName: String,
  },
  bookName: String,
  authorName: String,
  description: String,
  pages: Number,
  price: Number,
  coverPhoto: String,
  secondaryImage: String,
  thirdImage: String,
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
