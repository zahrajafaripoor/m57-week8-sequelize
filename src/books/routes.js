const express = require('express');
const router = express.Router();
const bookController = require('./controllers');

// Routes related to books
router.post('/addbook', bookController.addBook); // Adds a new book at /books/addbook
router.get('/allbooks', bookController.getAllBooks); // Retrieves all books
router.get('/genre/:genreId', bookController.getBooksByGenre); // Retrieves books based on genre

// Routes related to authors
router.post('/authors', bookController.addAuthor); // Adds a new author at /books/authors
router.get('/authors/:name', bookController.getAuthorByName); // Retrieves an author by name along with associated books

module.exports = router;