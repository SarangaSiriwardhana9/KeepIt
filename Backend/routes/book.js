const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Import the Book model

// Create a new book listing
router.post('/add', async (req, res) => {
  try {
    const { sellerName, sellerId, ...bookData } = req.body; // Extract sellerName and sellerId

    // Add the seller's name and ID to the book data
    bookData.sellerName = sellerName;
    bookData.sellerId = sellerId;

    const newBook = new Book(bookData);

    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a list of all books sorted by _id in descending order (latest added first)
router.get('/all', async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true }).sort({ _id: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search books by name
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query; // Extract the search query from the query parameters

    if (!query) {
      return res.status(400).json({ message: 'Search query is required in the query parameter.' });
    }

    const regex = new RegExp(query, 'i'); // Create a case-insensitive regular expression for the search

    const books = await Book.find({ bookName: { $regex: regex } });

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Get book details by ID (retrieving book details by book ID)
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

// Add this route to routes/book.js
// Update book availability to false by book ID
router.put('/setUnavailable/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update the book's isAvailable field to false
    book.isAvailable = false;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Get book details by book ID
router.get('/details/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get books by seller's province
router.get('/byProvince/:province', async (req, res) => {
  try {
    const province = req.params.province;
    const books = await Book.find({ isAvailable: true, sellerProvince: province });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books by province' });
  }
});


module.exports = router;
