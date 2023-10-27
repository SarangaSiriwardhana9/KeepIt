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
  sellerName: String,  
  sellerId: mongoose.Schema.Types.ObjectId,  
  isAvailable: {
    type: Boolean,
    default: true, 
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
