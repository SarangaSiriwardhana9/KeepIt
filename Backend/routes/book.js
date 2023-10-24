const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Import the Book model

// Create a new book listing
router.post('/add', async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = new Book(bookData);

    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a list of all books
router.get('/all', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get book details by ID
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Middleware to retrieve book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book;
  next();
}

module.exports = router;
